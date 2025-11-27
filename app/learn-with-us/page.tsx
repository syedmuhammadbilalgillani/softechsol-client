"use client";

import dynamic from "next/dynamic";
import { Slider } from "@/components/slider";
import ReactIcon from "@/components/svgs/react";
import NextIcon from "@/components/svgs/next";
import FlutterIcon from "@/components/svgs/express";
import VueIcon from "@/components/svgs/vue";
import DjangoIcon from "@/components/svgs/django";
import NestIcon from "@/components/svgs/nest";
import MongoDB from "@/components/svgs/mongodb";
import TailwindIcon from "@/components/svgs/tailwind";
import PhotoshopIcon from "@/components/svgs/ps";
import ExpressIcon from "@/components/svgs/express";

const TestimonialSection = dynamic(
  () => import("@/components/testimonial-section"),
  {
    loading: () => <div className="main py-10">Loading...</div>,
  }
);

const LearnWithUs = () => {
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
      className="flex  bg-gray-200 rounded p-2 items-center justify-center gap-2 min-w-[150px]"
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
      <main className="main py-10">
        <section aria-labelledby="technologies-section" className="space-y-5">
          <h2 id="technologies-section" className="text-2xl font-bold">
            Technologies We Teach
          </h2>
          <Slider logos={technologyItems} speed={30} pauseOnHover={true} />
        </section>
      </main>
      <TestimonialSection />
    </>
  );
};

export default LearnWithUs;
