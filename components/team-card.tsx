"use client";

import { GalleryItem, Team } from "@/app/generated/prisma";
import ImageWrapper from "./image-wrapper";
import { Twitter, Github, Globe } from "lucide-react";
import { STORAGE_URL } from "@/constants/url";
import logger from "@/lib/logger";
import { motion, Variants } from "framer-motion";
import LinkedInIcon from "./svgs/linkedin";
import FacebookIcon from "./svgs/facebook";
import InstagramIcon from "./svgs/instagram";
import { useState, useEffect, useRef } from "react";

const overlayVariants = {
  initial: {
    y: "58%",
    opacity: 0.9,
  },
  hover: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
  expanded: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const TeamCard = ({
  data,
}: {
  data: Team & { featured_image: GalleryItem };
}) => {
  logger.info(data, "data");
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else if (e.key === "Escape" && isExpanded) {
      setIsExpanded(false);
    }
  };

  // Close overlay when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        isExpanded
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      // Use a small delay to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isExpanded]);

  return (
    <article className="mb-6 w-full sm:w-fit p-4 sm:p-8 rounded-2xl group">
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden rounded-xl cursor-pointer touch-manipulation"
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-label={`${data?.title} - ${data?.position}`}
      >
        {/* Main Image */}
        <ImageWrapper
          src={`${STORAGE_URL}${data?.featured_image?.url}` || ""}
          alt={data?.featured_image?.altText || ""}
          width={500}
          height={600}
          isZoom={false}
          className="rounded-xl max-h-[420px] min-h-[420px] sm:max-h-[420px] sm:min-h-[420px] object-cover w-full"
        />

        {/* Animated Overlay */}
        <motion.div
          variants={overlayVariants as Variants}
          animate={isExpanded ? "expanded" : undefined}
          className="absolute bottom-0 right-0 w-full bg-white/60 backdrop-blur-md px-4 sm:px-5 py-3 rounded-xl md:pointer-events-auto pointer-events-auto"
        >
          <header className="flex items-center gap-3 mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-2xl font-bold line-clamp-2 min-h-6">{data?.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{data?.position}</p>
            </div>
          </header>

          {data?.description && (
            <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 line-clamp-2">{data.description}</p>
          )}

          {/* Social Icons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {data?.linkedinUrl && (
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 hover:opacity-80 active:scale-95 transition-all touch-manipulation"
                aria-label="LinkedIn"
              >
                <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                  <LinkedInIcon />
                </div>
              </a>
            )}
            {data?.twitterUrl && (
              <a
                href={data.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 text-blue-400 hover:text-blue-600 active:scale-95 transition-all touch-manipulation"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            )}
            {data?.facebookUrl && (
              <a
                href={data.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 hover:opacity-80 active:scale-95 transition-all touch-manipulation"
                aria-label="Facebook"
              >
                <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                  <FacebookIcon />
                </div>
              </a>
            )}
            {data?.instagramUrl && (
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 hover:opacity-80 active:scale-95 transition-all touch-manipulation"
                aria-label="Instagram"
              >
                <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                  <InstagramIcon />
                </div>
              </a>
            )}
            {data?.githubUrl && (
              <a
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 text-gray-700 hover:text-gray-900 active:scale-95 transition-all touch-manipulation"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {data?.websiteUrl && (
              <a
                href={data.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 text-gray-700 hover:text-gray-900 active:scale-95 transition-all touch-manipulation"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </article>
  );
};

export default TeamCard;
