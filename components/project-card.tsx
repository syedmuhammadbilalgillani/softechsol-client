"use client";
import Link from "next/link";
import ImageWrapper from "./image-wrapper";
import ArrowRight from "./svgs/arrow-right";

const ProjectCard = ({ data }: { data: any }) => {
  return (
    <article className="mb-6">
      <ImageWrapper
        src={data?.images[0]?.image?.url || "/team/1.png"}
        alt={data?.title || "Project Image"}
        quality={100}
        width={500}
        height={500}
        className="rounded-xl min-h-[400px] max-h-[400px] object-cover"
      />

      <div className="flex justify-between gap-5 items-center mt-2">
        <header>
          <h3 className="text-2xl font-bold">
            {data?.title || "Project Title"}
          </h3>
          <p className="text-gray-500">
            {data?.short_description || "Brief description not available."}
          </p>
        </header>

        <Link
          href={`/projects/${data?.project_id}`}
          aria-label={`View details of ${data?.title || "this project"}`}
        >
          <ArrowRight />
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
