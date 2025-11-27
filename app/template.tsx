"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Small delay to show spinner on route changes

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {isLoading && <Spinner />}
      {children}
    </>
  );
}
