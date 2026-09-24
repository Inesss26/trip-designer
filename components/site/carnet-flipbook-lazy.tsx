"use client";

import dynamic from "next/dynamic";

function CarnetFlipbookFallback() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pt-24 pb-24 sm:px-8 lg:px-11">
      <div className="flex flex-col gap-4">
        <p className="type-tag text-brand/30">Aperçu interactif</p>
        <h2 className="type-h2 text-text-brand">
          À quoi ressemble{" "}
          <span className="type-h2-italic text-brand-secondary">
            votre carnet ?
          </span>
        </h2>
        <p className="type-body text-brand/50">
          Découvrez un aperçu des conseils d&apos;experte et de la sélection
          d&apos;adresses.
        </p>
      </div>
      <div className="flex h-[220px] items-center justify-center bg-bg-muted p-5 sm:h-[360px] lg:h-[463px]">
        <p className="type-body text-brand/50">Chargement de l&apos;aperçu…</p>
      </div>
    </section>
  );
}

export const CarnetFlipbook = dynamic(
  () =>
    import("@/components/site/carnet-flipbook").then((mod) => mod.CarnetFlipbook),
  { ssr: false, loading: () => <CarnetFlipbookFallback /> },
);
