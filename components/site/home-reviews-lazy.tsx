"use client";

import dynamic from "next/dynamic";

export const HomeReviews = dynamic(
  () => import("@/components/site/home-reviews").then((mod) => mod.HomeReviews),
  { ssr: false },
);
