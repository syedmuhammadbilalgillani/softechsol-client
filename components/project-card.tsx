"use client";
import { GalleryItem, Project } from "@/app/generated/prisma";
import { STORAGE_URL } from "@/constants/url";
import ImageWrapper from "./image-wrapper";
import ArrowRight from "./svgs/arrow-right";

const ProjectCard = ({
  data,
}: {
  data: Project & { image: GalleryItem | null };
}) => {
  const url = data?.image?.url?.startsWith("https://res.cloudinary.com")
    ? data?.image?.url
    : `${STORAGE_URL}${data?.image?.url}`;
  return (
    <article className="group hover:rotate-1 hover:scale-105 relative mb-6 shadow p-5 rounded-xl w-full min-h-[400px] overflow-hidden transition-all duration-300  hover:shadow-lg">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-linear-to-r from-darkblue via-primary to-white group-hover:w-full transition-all duration-500 ease-out z-10 rounded-t-xl"></div>
      
      <ImageWrapper
        src={url}
        alt={data?.image?.altText || ""}
        quality={100}
        width={500}
        height={500}
        className="rounded-xl min-h-[180px] max-h-[180px] object-cover shadow aspect-video w-full transition-transform duration-300 "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      />

      <div className="flex justify-between gap-5 items-center mt-2 ">
        <header>
          <div className="flex justify-between gap-5 items-center mb-2">
            <h3 className="text-2xl font-bold line-clamp-2 ">{data?.title || ""}</h3>
            <a
              href={data?.url || "/"}
              aria-label={`View details of ${data?.title || "this project"}`}
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <ArrowRight />
            </a>
          </div>
          <p title={data?.description || ""} className="text-gray-500 line-clamp-4">
            {data?.description || ""}
          </p>
          <div className="flex flex-wrap items-center gap-2 my-2">
            {data?.technologies?.map((tag: string) => (
              <div
                key={tag}
                className="text-sm  bg-primary px-2 py-1 rounded-full text-white transition-all duration-300 "
              >
                {tag}
              </div>
            ))}
          </div>
        </header>
      </div>
    </article>
  );
};

export default ProjectCard;
