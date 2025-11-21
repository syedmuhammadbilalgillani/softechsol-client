import ImageWrapper from "@/components/image-wrapper";
import JobPostCard from "@/components/job-post-card";
import { fetchJobCategories, fetchJobs } from "@/lib/apis";
import logger from "@/lib/logger";
import Link from "next/link";

const CareersPage = async () => {
  const categories = await fetchJobCategories();
  const jobs = await fetchJobs();
  logger.info(jobs, "jobs");
  logger.info(categories, "categories");
  return (
    <main className="main py-12">
      <header className="mb-5">
        <h1 className="text-4xl md:text-5xl font-bold text-start mb-3">
          Careers
        </h1>
      </header>
      {/* Categories */}
      <section aria-labelledby="careers-categories-heading" className="mb-10">
        <h2 id="careers-categories-heading" className="sr-only">
          Careers Categories
        </h2>
        {categories.length > 0 && (
          <nav aria-label="Careers categories">
            <ul className="flex flex-wrap gap-3 md:gap-4">
              {categories.map((category) => (
                <li key={category.category_id}>
                  <Link href={`/careers/${category.category_id}`}>
                    <span className="inline-block bg-primary/5 hover:bg-primary hover:text-white text-sm md:text-base transition-all duration-300 py-2 px-5 md:px-7 rounded-full border border-primary/10 shadow-sm cursor-pointer">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>
      <div className="relative h-[600px] w-full">
        <ImageWrapper
          src="/careers.jpg"
          alt="Careers Banner"
          className="object-cover rounded-xl h-full w-full"
        />
      </div>
      <h2 className="text-2xl font-bold text-center">
        Currently Open Positions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobPostCard key={job.job_id} job={job} />
        ))}
      </div>
    </main>
  );
};

export default CareersPage;
