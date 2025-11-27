"use client";

import dynamic from "next/dynamic";

// Lazy load heavy components
export const LazyToaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => ({ default: mod.Toaster })),
  {
    ssr: false, // Toaster doesn't need SSR
  }
);

export const LazyScrollToTop = dynamic(
  () => import("@/components/scroll-to-top"),
  {
    ssr: false, // Client-only component
  }
);
