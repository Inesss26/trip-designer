declare module "page-flip" {
  export type PageFlipEvent<T = unknown> = {
    data: T;
    object: PageFlip;
  };

  export type PageFlipOrientation = "portrait" | "landscape";

  export type PageFlipOptions = {
    startPage?: number;
    size?: "fixed" | "stretch";
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  };

  export class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    destroy(): void;
    update(): void;
    loadFromImages(images: string[]): void;
    updateFromImages(images: string[]): void;
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    updateFromHtml(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    turnToPage(page: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): PageFlipOrientation;
    on(event: "flip", cb: (e: PageFlipEvent<number>) => void): PageFlip;
    on(
      event: "changeOrientation",
      cb: (e: PageFlipEvent<PageFlipOrientation>) => void,
    ): PageFlip;
    on(event: string, cb: (e: PageFlipEvent) => void): PageFlip;
  }
}
