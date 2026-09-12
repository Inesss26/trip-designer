"use client";

import dynamic from "next/dynamic";

export const CarnetFlipbook = dynamic(
  () =>
    import("@/components/site/carnet-flipbook").then((mod) => mod.CarnetFlipbook),
  { ssr: false },
);
