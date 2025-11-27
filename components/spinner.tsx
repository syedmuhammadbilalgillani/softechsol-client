"use client";

import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner = ({ size = "md", className = "" }: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-background/80 backdrop-blur-sm ${className}`}
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2
          className={`${sizeClasses[size]} animate-spin text-primary`}
          aria-hidden="true"
        />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
