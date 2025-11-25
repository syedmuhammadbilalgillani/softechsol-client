import { fetchProjects } from "@/lib/apis";
import logger from "@/lib/logger";
import Link from "next/link";
import Heading from "./heading";
import ProjectCard from "./project-card";
import { Button, buttonVariants } from "./ui/button";

const ProjectSection = async () => {
  const projectsData = await fetchProjects();
  logger.info(projectsData, "projects data");

  return (
    <main className="main py-10">
      <section aria-labelledby="projects-section">
        <Heading title="Recent Work" />
        <h3 className="text-3xl font-bold pb-5" id="projects-title">
          We turn your goals into tangible results
        </h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {projectsData.slice(0, 6).map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))}
        </div>
      </section>
      <div className="flex justify-center mt-5">
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
    </main>
  );
};

export default ProjectSection;
