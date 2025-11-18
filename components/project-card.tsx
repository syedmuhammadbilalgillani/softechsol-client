"use client";
import { Project } from "@/app/generated/prisma/client";
import ImageWrapper from "./image-wrapper";
import ArrowRight from "./svgs/arrow-right";
import Link from "next/link";

const ProjectCard = ({ data }: { data: Project }) => {
  return (
    <article className="mb-6">
      <ImageWrapper
        src={"/team/1.png"} // Dynamic image URL
        alt={data?.title || "Project Image"}
        
        width={500}
        height={500}
        className="rounded-xl hide"
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
