"use client";

import { GalleryItem, Podcast } from "@/app/generated/prisma";
import Heading from "@/components/heading";
import PodcastCard from "@/components/podcast-card";
import { Slider } from "@/components/slider";
import DjangoIcon from "@/components/svgs/django";
import ExpressIcon from "@/components/svgs/express";
import MongoDB from "@/components/svgs/mongodb";
import NestIcon from "@/components/svgs/nest";
import NextIcon from "@/components/svgs/next";
import PhotoshopIcon from "@/components/svgs/ps";
import ReactIcon from "@/components/svgs/react";
import TailwindIcon from "@/components/svgs/tailwind";
import VueIcon from "@/components/svgs/vue";
import dynamic from "next/dynamic";
import Spinner from "@/components/spinner";

const TestimonialSection = dynamic(
  () => import("@/components/testimonial-section"),
  {
    loading: () => <Spinner />,
  }
);

const LearnWithUsPage = ({ podcasts }: { podcasts: any[] }) => {
  const technologies = [
    { icon: <ReactIcon />, label: "React" },
    { icon: <NextIcon />, label: "Next.js" },
    { icon: <ExpressIcon />, label: "Express.js" },
    { icon: <VueIcon />, label: "Vue.js" },
    { icon: <DjangoIcon />, label: "Django" },
    { icon: <NestIcon />, label: "Nest.js" },
    { icon: <MongoDB />, label: "MongoDB" },
    { icon: <TailwindIcon />, label: "Tailwind CSS" },
    { icon: <PhotoshopIcon />, label: "Photoshop" },
  ];

  const technologyItems = technologies.map((tech, index) => (
    <div
      key={index}
      className="flex bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-3 items-center justify-center gap-3 min-w-[150px] border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-center w-8 h-8">
        {tech.icon}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {tech.label}
      </span>
    </div>
  ));

  return (
    <>
      <main className="main py-10 md:py-16">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Learn With Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our educational resources, listen to insightful podcasts,
            and master the latest technologies in software development.
          </p>
        </section>

        {/* Technologies Section */}
        <section
          aria-labelledby="technologies-section"
          className="space-y-6 mb-16 md:mb-20"
        >
          <Heading title="Technologies We Teach" />
          <Slider logos={technologyItems} speed={30} pauseOnHover={true} />
        </section>

        {/* Podcasts Section */}
        <section
          aria-labelledby="podcasts-section"
          className="space-y-6 mb-16 md:mb-20"
        >
          <Heading title="Podcasts" />
          {podcasts && podcasts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  data={podcast as Podcast & { image: GalleryItem | null }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                No podcasts available at the moment. Check back soon for new
                episodes!
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-linear-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our community and stay updated with the latest tutorials,
            podcasts, and educational content.
          </p>
        </section>
      </main>
      <TestimonialSection />
    </>
  );
};

export default LearnWithUsPage;
