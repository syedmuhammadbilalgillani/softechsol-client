"use client";
import { STORAGE_URL } from "@/constants/url";
import ImageWrapper from "./image-wrapper";
import ArrowRight from "./svgs/arrow-right";

const ProjectCard = ({ data }: { data: any }) => {
  const url = data?.image?.url?.startsWith("https://res.cloudinary.com")
    ? data?.image?.url
    : `${STORAGE_URL}${data?.image?.url}`;
  return (
    <article className="mb-6 shadow p-5 rounded-xl w-full">
      <ImageWrapper
        src={url}
        alt={data?.image?.altText || "Project Image"}
        quality={100}
        width={500}
        height={500}
        className="rounded-xl min-h-[250px] max-h-[250px] object-cover shadow aspect-video w-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      />

      <div className="flex justify-between gap-5 items-center mt-2">
        <header>
          <h3 className="text-xl font-bold">
            {data?.title || "Project Title"}
          </h3>
          <p className="text-gray-500 line-clamp-3">
            {data?.description || "Brief description not available."}
          </p>
        </header>

        <a
          href={data?.url || "/"}
          aria-label={`View details of ${data?.title || "this project"}`}
        >
          <ArrowRight />
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
