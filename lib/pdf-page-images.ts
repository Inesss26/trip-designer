import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist";

export const CARNET_PREVIEW_PDF = "/carnets/apercu.pdf";

export type PdfPagePreview = {
  pages: string[];
  pageWidth: number;
  pageHeight: number;
  total: number;
  status?: string;
};

const PDF_WORKER_SRC = "/pdf.worker.min.mjs?v=4.10.38";
const TARGET_CSS_WIDTH = 480;
const JPEG_QUALITY = 0.92;

let workerConfigured = false;
let cachedPreview: PdfPagePreview | null = null;
let inflightRender: Promise<PdfPagePreview> | null = null;
const progressListeners = new Set<(preview: PdfPagePreview) => void>();

function emitProgress(preview: PdfPagePreview) {
  progressListeners.forEach((listener) => listener(preview));
}

function configurePdfWorker() {
  if (workerConfigured || typeof window === "undefined") return;
  GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
  workerConfigured = true;
}

function renderScaleForPage(pageWidth: number): number {
  const pixelRatio = (window.devicePixelRatio || 1) * 2;
  return Math.min(pixelRatio * (TARGET_CSS_WIDTH / pageWidth), 1.45);
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export async function renderPdfPages(
  url: string,
  onProgress?: (preview: PdfPagePreview) => void,
): Promise<PdfPagePreview> {
  if (onProgress) progressListeners.add(onProgress);

  try {
    if (cachedPreview) {
      onProgress?.(cachedPreview);
      return cachedPreview;
    }

    if (!inflightRender) {
      inflightRender = rasterizePdf(url)
        .then((preview) => {
          cachedPreview = preview;
          return preview;
        })
        .finally(() => {
          inflightRender = null;
        });
    }

    return await inflightRender;
  } finally {
    if (onProgress) progressListeners.delete(onProgress);
  }
}

async function rasterizePdf(url: string): Promise<PdfPagePreview> {
  configurePdfWorker();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de charger le PDF (${response.status})`);
  }

  const data = new Uint8Array(await response.arrayBuffer());
  const loadingTask = getDocument({
    data,
    verbosity: 0,
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    isOffscreenCanvasSupported: false,
  });
  const pdf: PDFDocumentProxy = await loadingTask.promise;
  const pages: string[] = [];
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    await pdf.destroy();
    await loadingTask.destroy();
    throw new Error("Canvas indisponible pour le rendu du carnet");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  let pageWidth = 0;
  let pageHeight = 0;
  let scale = 1;

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);

      if (pageNumber === 1) {
        const baseViewport = page.getViewport({ scale: 1 });
        pageWidth = baseViewport.width;
        pageHeight = baseViewport.height;
        scale = renderScaleForPage(pageWidth);
        emitProgress({
          pages: [],
          pageWidth,
          pageHeight,
          total: pdf.numPages,
          status: "Document chargé",
        });
      }

      emitProgress({
        pages: pages.slice(),
        pageWidth,
        pageHeight,
        total: pdf.numPages,
        status: `Rendu de la page ${pageNumber}`,
      });

      const viewport = page.getViewport({ scale });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      pages.push(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      page.cleanup();

      const shouldEmit =
        pages.length === 1 ||
        pages.length === 2 ||
        pages.length === pdf.numPages ||
        pages.length % 4 === 0;
      if (shouldEmit) {
        emitProgress({
          pages: pages.slice(),
          pageWidth,
          pageHeight,
          total: pdf.numPages,
        });
      }

      await yieldToMain();
    }

    if (pages.length % 2 === 1) {
      const last = pages.pop();
      if (last) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        pages.push(canvas.toDataURL("image/jpeg", 0.7));
        pages.push(last);
      }
    }

    return {
      pages,
      pageWidth,
      pageHeight,
      total: pdf.numPages,
    };
  } finally {
    canvas.width = 0;
    canvas.height = 0;
    await pdf.destroy();
    await loadingTask.destroy();
  }
}
