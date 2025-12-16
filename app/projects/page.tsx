import Heading from "@/components/heading";
import ProjectCard from "@/components/project-card";
import TestimonialSection from "@/components/testimonial-section";
import { fetchProjects } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  const projectsData = await fetchProjects({ limit: 10 });
  logger.info(projectsData, "project data");

  const hasProjects = projectsData && Array.isArray(projectsData) && projectsData.length > 0;

  return (
    <main className="main py-10 md:py-16">
      <section aria-labelledby="projects-section" className="space-y-8 md:space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <Heading title="Projects" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize text-gray-900">
            Our Work Showcase
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl">
            Explore our portfolio of innovative projects and digital solutions that have transformed businesses worldwide.
          </p>
        </div>

        {/* Projects Grid or Empty State */}
        {!hasProjects ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
            <div className="bg-gray-50 rounded-full p-6 mb-6">
              <FolderOpen className="w-16 h-16 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 text-center">
              No Projects Available
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-8">
              We&#39;re currently updating our portfolio. Check back soon to see our latest work and innovative solutions.
            </p>
            <Link href="/contact" aria-label="Contact us">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projectsData.map((project: any, index: number) => (
                <ProjectCard key={project?.project_id || index} data={project} />
              ))}
            </div>
            
            {/* Projects Count */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Showing {projectsData.length} {projectsData.length === 1 ? "project" : "projects"}
              </p>
            </div>
          </>
        )}

        {/* Testimonial Section - Only show if there are projects */}
        {hasProjects && <TestimonialSection />}
      </section>
    </main>
  );
};

export default ProjectsPage;