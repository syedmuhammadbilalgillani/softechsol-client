import ImageWrapper from "@/components/image-wrapper";
import JobPostCard from "@/components/job-post-card";
import { DOMAIN_URL } from "@/constants/url";
import { fetchJobCategories, fetchJobs } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";
import { Job } from "../generated/prisma/client";
import CareersClient from "@/components/careers-client";

export const metadata: Metadata = {
  title: "Careers | Join Our Team | SoftechSol",
  description:
    "Explore exciting career opportunities at SoftechSol. Join our team of talented professionals and work on innovative projects. Browse open positions and find your next role.",
  metadataBase: new URL(DOMAIN_URL),
  openGraph: {
    title: "Careers | Join Our Team | SoftechSol",
    description:
      "Explore exciting career opportunities at SoftechSol. Join our team of talented professionals and work on innovative projects.",
    url: `${DOMAIN_URL}/careers`,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/careers.jpg`,
        width: 1200,
        height: 630,
        alt: "SoftechSol Careers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Join Our Team | SoftechSol",
    description:
      "Explore exciting career opportunities at SoftechSol. Join our team and work on innovative projects.",
    images: [`${DOMAIN_URL}/careers.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/careers",
  },
};

const CareersPage = async () => {
  let categories: Array<{ slug: string; name: string }> = [];
  let jobs: Job[] = [];
  let error: string | null = null;

  try {
    // Fetch all jobs (no category filter)
    const [fetchedCategories, fetchedJobs] = await Promise.all([
      fetchJobCategories(),
      fetchJobs(), // Fetch all jobs without category filter
    ]);
    
    logger.info(fetchedCategories, "fetchedCategories");
    logger.info(fetchedJobs, "fetchedJobs");
    
    categories = Array.isArray(fetchedCategories) ? fetchedCategories : [];
    jobs = Array.isArray(fetchedJobs) ? (fetchedJobs as unknown as Job[]) : [];
    
    logger.info(categories, "categories");
    logger.info(jobs, "jobs");
  } catch (err) {
    logger.error(err, "Error fetching careers data");
    error = "Failed to load careers data. Please try again later.";
  }

  return (
    <main className="main py-12">
      <header className="mb-5">
        <h1 className="text-4xl md:text-5xl font-bold text-start mb-3">
          Careers
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Join our team and help shape the future of technology. Explore open
          positions and find your next opportunity.
        </p>
      </header>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <CareersClient categories={categories} jobs={jobs} />
      )}
    </main>
  );
};

export default CareersPage;
