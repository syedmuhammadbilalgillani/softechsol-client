"use client";

import { Job } from "@/app/generated/prisma/client";
import JobPostCard from "@/components/job-post-card";
import { AnimatePresence, motion, useAnimate, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Category {
  slug: string;
  name: string;
}

interface CareersClientProps {
  categories: Category[];
  jobs: Job[];
}

const CareersClient = ({ categories, jobs }: CareersClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const jobsSectionRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const isInitialMount = useRef(true);

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory
    ? jobs.filter((job) =>
        (job as any).categories?.some(
          (catRel: any) => catRel.category?.slug === selectedCategory
        )
      )
    : jobs;

  // Get selected category name
  const selectedCategoryName = selectedCategory
    ? categories.find((cat) => cat.slug === selectedCategory)?.name || null
    : null;

  // Smooth scroll to jobs section when category changes using Framer Motion
  useEffect(() => {
    // Skip scroll on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (jobsSectionRef.current) {
      const element = jobsSectionRef.current;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = 100; // Offset from top

      animate(window.scrollY, elementPosition - offset, {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animation
        onUpdate: (latest) => {
          window.scrollTo(0, latest);
        },
      });
    }
  }, [selectedCategory, animate]);

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
  };

  // Animation variants for job cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Categories */}
      <section aria-labelledby="careers-categories-heading" className="mb-10">
        <h2 id="careers-categories-heading" className="sr-only">
          Careers Categories
        </h2>
        {categories.length > 0 ? (
          <nav aria-label="Careers categories">
            <ul className="flex flex-wrap gap-3 md:gap-4">
              <li>
                <motion.button
                  onClick={() => handleCategoryClick(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-block text-sm md:text-base transition-all duration-300 py-2 px-5 md:px-7 rounded-full border shadow-sm cursor-pointer ${
                    !selectedCategory
                      ? "bg-primary text-white border-primary"
                      : "bg-primary/5 hover:bg-primary hover:text-white border-primary/10"
                  }`}
                >
                  All Jobs
                </motion.button>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <motion.button
                    onClick={() => handleCategoryClick(cat.slug)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-block text-sm md:text-base transition-all duration-300 py-2 px-5 md:px-7 rounded-full border shadow-sm cursor-pointer ${
                      selectedCategory === cat.slug
                        ? "bg-primary text-white border-primary"
                        : "bg-primary/5 hover:bg-primary hover:text-white border-primary/10"
                    }`}
                  >
                    {cat.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <p className="text-gray-500 text-sm">
            No job categories available at the moment.
          </p>
        )}
      </section>

      <div className="relative h-[500px] w-full mb-10">
        <Image
          src="/careers.jpg"
          fill
          alt="Careers Banner"
          className="object-cover rounded-xl h-full w-full"
        />
      </div>

      <motion.section
        ref={jobsSectionRef}
        aria-labelledby="currently-open-positions-heading"
        className="py-10 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <motion.h2
            id="currently-open-positions-heading"
            className="text-3xl font-bold"
            key={selectedCategoryName || "all"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {selectedCategoryName
              ? `${selectedCategoryName} Positions`
              : "Currently Open Positions"}
          </motion.h2>
          {selectedCategoryName && (
            <motion.button
              onClick={() => handleCategoryClick(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary hover:underline text-sm md:text-base"
            >
              View All Jobs →
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {filteredJobs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-8 rounded-lg text-center"
            >
              <p className="text-lg font-semibold mb-2">
                {selectedCategoryName
                  ? `No positions available in ${selectedCategoryName}`
                  : "No open positions at the moment"}
              </p>
              <p className="text-sm text-gray-600">
                {selectedCategoryName
                  ? "Check back later or browse other categories."
                  : "We're always looking for talented individuals. Check back soon for new opportunities!"}
              </p>
              {selectedCategoryName && (
                <motion.button
                  onClick={() => handleCategoryClick(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block mt-4 text-primary hover:underline font-medium"
                >
                  View All Jobs
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-gray-600 text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {selectedCategoryName
                  ? `Found ${filteredJobs.length} position${
                      filteredJobs.length !== 1 ? "s" : ""
                    } in ${selectedCategoryName}`
                  : `We have ${filteredJobs.length} open position${
                      filteredJobs.length !== 1 ? "s" : ""
                    } available`}
              </motion.p>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs.map((job, index: number) => (
                  <JobPostCard
                    key={(job as any).slug || index}
                    variants={itemVariants as Variants}
                    job={job as Job}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default CareersClient;
