"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Function to check if page is fully loaded
    const checkPageLoaded = () => {
      // Check if document is ready and all resources are loaded
      if (document.readyState === 'complete') {
        // Additional check: wait for images to load
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error to not block loading
            // Timeout fallback for broken images
            setTimeout(resolve, 3000);
          });
        });

        Promise.all(imagePromises).then(() => {
          // Small delay to ensure smooth transition
          requestAnimationFrame(() => {
            setIsLoading(false);
          });
        });
      } else {
        // Wait for window load event if document is not ready
        window.addEventListener('load', handlePageLoad, { once: true });
      }
    };

    const handlePageLoad = () => {
      // Wait for next frame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    };

    // Check immediately in case page is already loaded
    checkPageLoaded();

    // Also listen for load event as backup
    window.addEventListener('load', handlePageLoad, { once: true });

    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, [pathname]);

  return (
    <>
      {isLoading && <Spinner />}
      {children}
    </>
  );
}
