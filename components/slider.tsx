"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface SliderProps {
  className?: string;
  logos: React.ReactNode[];
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "ltr" | "rtl"; // Optional manual override
}

export const Slider: React.FC<SliderProps> = ({
  className,
  logos,
  speed = 20,
  pauseOnHover = true,
  direction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"ltr" | "rtl">("ltr");

  const duplicatedLogos = [
    ...logos,
    ...logos,
  ];

  useEffect(() => {
    setStart(true);
    // Auto-detect text direction if not manually set
    const dir =
      direction || document.documentElement.getAttribute("dir") || "ltr";
    setScrollDirection(dir === "rtl" ? "rtl" : "ltr");
  }, [direction]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div
          className={cn(
            "flex items-center gap-6 py-4 w-max",
            start && scrollDirection === "ltr" && "animate-scroll-ltr",
            start && scrollDirection === "rtl" && "animate-scroll-rtl",
            pauseOnHover && "hover:paused"
          )}
          style={
            {
              "--animation-duration": `${speed}s`,
            } as React.CSSProperties
          }
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
