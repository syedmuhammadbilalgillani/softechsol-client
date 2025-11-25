import { Project } from "@/app/generated/prisma";
import Heading from "@/components/heading";
import ImageWrapper from "@/components/image-wrapper";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { DOMAIN_URL } from "@/constants/url";
import { fetchProjects } from "@/lib/apis";
import logger from "@/lib/logger";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    const project = await prisma.project?.findUnique({
      include: {
        images: {
          include: {
            image: true,
          },
        },
      },
      where: { slug: decodeURIComponent(slug) },
    });

    if (!project) {
      return {
        title: "Project not found",
        description: "The requested project does not exist.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = project.meta_title || project.title || project.client_name || "Project Details";
    const description = project.meta_description || project.overview?.replace(/<[^>]*>/g, "").substring(0, 160) || "View this project from SoftechSol's portfolio.";

    const ogImage = project.images?.[0]?.image?.url || `${DOMAIN_URL}/home_hero.jpg`;
    const ogAlt = project.images?.[0]?.image?.altText || title;
    const projectUrl = `${DOMAIN_URL}/projects/${slug}`;

    return {
      title,
      description,
      metadataBase: new URL(DOMAIN_URL),
      openGraph: {
        title,
        description,
        url: projectUrl,
        siteName: "SoftechSol",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: ogAlt,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
        creator: "@SoftechSol",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: projectUrl,
      },
    };
  } catch (error) {
    // Return default metadata if Prisma fails
    return {
      title: "Project | SoftechSol",
      description: "View project details from SoftechSol's portfolio.",
    };
  }
}

const ProjectDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  // const projectId = Number.parseInt(slug, 10);

  // if (Number.isNaN(projectId)) {
  //   return notFound();
  // }

  const currentProject = await prisma.project?.findUnique({
    include: {
      images: {
        include: {
          image: true,
        },
      },
    },
    where: { project_id: Number(slug) },
  });

  if (!currentProject) {
    return notFound();
  }

  const moreProjects = await fetchProjects();

  const relatedProjects =
    moreProjects?.filter((p: Project) => p.project_id !== currentProject.project_id) ||
    [];

  logger.info(currentProject);

  return (
    <main className="main space-y-10">
      <article className="space-y-10">
        {/* Page header */}
        <header className="space-y-4 border-b pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {/* Prefer title if exists, fall back to client name */}
                {currentProject?.title ||
                  currentProject?.client_name ||
                  "Project Details"}
              </h1>
              {currentProject?.client_name && (
                <p className="text-sm text-muted-foreground">
                  Client: {currentProject.client_name}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
              {currentProject.timeline && (
                <span className="rounded-full border px-4 py-1 text-xs md:text-sm">
                  Timeline: {currentProject.timeline}
                </span>
              )}
              {currentProject.year && (
                <span className="rounded-full border px-4 py-1 text-xs md:text-sm">
                  Year: {currentProject.year}
                </span>
              )}
              <Link href="/contact">
                <Button size="lg" className="shadow-sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero image */}
        {currentProject.images?.[0]?.image?.url && (
          <section
            aria-label="Project hero image"
            className="relative my-6 h-[60vh] overflow-hidden rounded-2xl border bg-muted shadow-xl"
          >
            <ImageWrapper
              src={currentProject.images[0].image.url}
              alt={
                currentProject.images[0].image.altText || "Project hero image"
              }
              className="h-full w-full object-cover object-center"
            />
          </section>
        )}

        {/* Overview */}
        <section
          aria-labelledby="project-overview-heading"
          className="grid items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div>
            <Heading
              title="Project Overview"
              // if your Heading supports description prop, you can add it
            />
          </div>
          <div
            id="project-overview-heading"
            className="prose max-w-none text-base leading-relaxed dark:prose-invert"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: currentProject.overview || "",
            }}
          />
        </section>

        {/* Challenges */}
        <section
          aria-labelledby="project-challenges-heading"
          className="grid items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div>
            <Heading title="Key Challenges" />
          </div>
          <div id="project-challenges-heading">
            <p className="text-base leading-relaxed text-muted-foreground">
              {currentProject.challenges ||
                "Details about the project challenges will be added soon."}
            </p>
          </div>
        </section>

        {/* Gallery */}
        {currentProject.images?.length > 1 && (
          <section aria-label="Project gallery" className="space-y-4 pt-4">
            <Heading title="Gallery" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentProject.images.slice(1).map((image: any) => (
                <ImageWrapper
                  key={image.id}
                  src={image.image.url}
                  alt={image.image.altText}
                  height={500}
                  width={500}
                  className="h-full w-full rounded-xl object-cover object-center shadow-md transition-transform hover:scale-[1.02]"
                />
              ))}
            </div>
          </section>
        )}

        {/* More projects */}
        <section
          aria-labelledby="more-projects-heading"
          className="space-y-4 border-t pt-8"
        >
          <Heading title="More Projects" />
          <h3
            id="more-projects-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            View more projects
          </h3>

          {relatedProjects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {relatedProjects.map((project:any) => (
                <ProjectCard key={project.project_id} data={project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No more projects available right now. New case studies will be
              added soon.
            </p>
          )}
        </section>
      </article>
    </main>
  );
};

export default ProjectDetail;
