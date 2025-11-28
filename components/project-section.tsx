import { fetchProjects } from "@/lib/apis";
import logger from "@/lib/logger";
import Link from "next/link";
import Heading from "./heading";
import ProjectCard from "./project-card";
import { Button, buttonVariants } from "./ui/button";
import { Project } from "@/app/generated/prisma";

const ProjectSection = async () => {
  const projectsData = await fetchProjects({ limit: 6 });
  logger.info(projectsData, "projects data");

  const hasProjects = projectsData && Array.isArray(projectsData) && projectsData.length > 0;
  const displayProjects = hasProjects ? projectsData.slice(0, 6) : [];

  return (
    <main className="main py-10 md:py-16">
      <section aria-labelledby="projects-section" className="space-y-8 md:space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <Heading title="Recent Work" />
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900" id="projects-title">
            We turn your goals into tangible results
          </h3>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            Discover our latest projects and see how we've helped businesses achieve their digital transformation goals.
          </p>
        </div>

        {/* Projects Grid or Empty State */}
        {!hasProjects ? (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 md:p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              Our portfolio is being updated with exciting new projects.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Check back soon to see our latest work and innovative solutions.
            </p>
            <Link
              href="/projects"
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "px-8",
              })}
              aria-label="View All Projects"
            >
              View All Projects
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
              {displayProjects.map((project: Project, index: number) => (
                <ProjectCard key={project?.project_id || index} data={project} />
              ))}
            </div>
            
            {/* View All Button */}
            <div className="flex justify-center pt-4">
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "default",
                  className: "px-10",
                })}
                aria-label="View All Projects"
                href="/projects"
              >
                View All Projects
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default ProjectSection;