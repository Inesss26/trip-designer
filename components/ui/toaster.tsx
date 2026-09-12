"use client";

import dynamic from "next/dynamic";

export const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false },
);
