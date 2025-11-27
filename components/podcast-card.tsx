"use client";

import Link from "next/link";
import ImageWrapper from "./image-wrapper";
import { GalleryItem, Podcast } from "@/app/generated/prisma";
import { Play, ExternalLink } from "lucide-react";

type PodcastCardProps = {
  data: Podcast & { image: GalleryItem | null };
};

const PodcastCard = ({ data }: PodcastCardProps) => {
  if (!data) return null;

  const imageUrl = data.image?.url || "";
  const imageAlt = data.image?.altText || data.title || "Podcast thumbnail";
  const formattedDate = data.publish_date
    ? new Date(data.publish_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <div className="relative">
            <ImageWrapper
              src={imageUrl}
              alt={imageAlt}
              width={500}
              height={400}
              className="rounded-t-2xl h-[220px] md:h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-100 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary fill-primary" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[220px] md:h-[260px] w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-gray-400">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
              <Play className="w-12 h-12 text-primary fill-primary" />
            </div>
          </div>
        )}
        {data.is_featured && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6 gap-3">
        <header className="space-y-2">
          <h3 className="text-xl font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {data.title || "Untitled Podcast"}
          </h3>
          {formattedDate && (
            <p className="text-xs text-gray-500 font-medium">{formattedDate}</p>
          )}
        </header>

        {data.description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
            {data.description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <Link
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group/link"
          >
            Listen Now
            <ExternalLink className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PodcastCard;
