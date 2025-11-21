import Heading from "@/components/heading";
import ProjectCard from "@/components/project-card";
import TestimonialSection from "@/components/testimonial-section";
import { fetchProjects } from "@/lib/apis";
import logger from "@/lib/logger";

const ProjectsPage = async () => {
  const projectsData = await fetchProjects();
  logger.info(projectsData, "project data");
  return (
    <main className="main py-10">
      <section aria-labelledby="projects-section">
        <Heading title="Projects" />
        <h2 className="text-4xl font-bold pb-5 capitalize">
          our work showcase
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))}
        </div>
        <TestimonialSection />
      </section>
    </main>
  );
};

export default ProjectsPage;
