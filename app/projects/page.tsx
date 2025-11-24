import Heading from "@/components/heading";
import ProjectCard from "@/components/project-card";
import TestimonialSection from "@/components/testimonial-section";
import { fetchProjects } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore SoftechSol's portfolio of successful projects. View our work showcase featuring innovative software solutions, web applications, and digital transformations for clients worldwide.",
  openGraph: {
    title: "Projects | Our Work Showcase | SoftechSol",
    description:
      "Explore SoftechSol's portfolio of successful projects. View our work showcase featuring innovative software solutions and digital transformations.",
    url: `${DOMAIN_URL}/projects`,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/home_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "SoftechSol Projects Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Our Work Showcase | SoftechSol",
    description:
      "Explore SoftechSol's portfolio of successful projects and innovative software solutions.",
    images: [`${DOMAIN_URL}/home_hero.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/projects",
  },
};

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
