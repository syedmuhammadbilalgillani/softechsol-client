"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageWrapperProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholderSrc?: string; // Optional placeholder image
  className?: string;
  onErrorSrc?: string; // Optional fallback image if there's an error
  sizes?: string;
  isZoom?: boolean;
};

const ImageWrapper = ({
  src,
  alt,
  width,
  height,
  quality = 75,
  placeholderSrc = "/placeholder.svg",
  className = "",
  isZoom = false,
  onErrorSrc = "/placeholder.svg", // Default fallback
  sizes = "(max-width: 768px) 100vw, 500px",
}: ImageWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true); // Track if image is loading
  const [imgSrc, setImgSrc] = useState(src); // Track current image source

  // Handle image load error
  const handleError = () => {
    setImgSrc(onErrorSrc); // Set fallback image if there's an error
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {width && height ? (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          className={cn(
            isZoom
              ? "object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              : "",
            className
          )}
          loading="lazy"
          sizes={sizes}
          placeholder="blur"
          blurDataURL={placeholderSrc} // Blur effect while image loads
          onLoadingComplete={() => setIsLoading(false)} // Hide loader when image loads
          onError={handleError} // Handle error and fallback to default image
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          quality={quality}
          className={cn(
            isZoom
              ? "object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              : "",
            className
          )}
          loading="lazy"
          sizes={sizes}
          placeholder="blur"
          blurDataURL={placeholderSrc} // Blur effect while image loads
          onLoadingComplete={() => setIsLoading(false)} // Hide loader when image loads
          onError={handleError} // Handle error and fallback to default image
        />
      )}
    </div>
  );
};

export default ImageWrapper;
