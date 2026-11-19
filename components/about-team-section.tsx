"use client";

import { GalleryItem, Team } from "@/app/generated/prisma";
import { motion, Variants } from "framer-motion";
import Heading from "./heading";
import TeamCard from "./team-card";

const AboutTeamSection = ({
  teams,
}: {
  teams: (Team & { featured_image: GalleryItem | null | undefined })[];
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
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
    <motion.section
      className="space-y-5 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Heading as="h2" title="Our Team" />
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
          Meet the Minds Behind the Code
        </h3>
        <p className="text-gray-600 text-base md:text-lg max-w-xl">
          Experienced software engineers and designers dedicated to building reliable digital solutions.
        </p>
      </motion.div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 pt-4">
        {teams.map((team) => (
          <div key={team.id}>
            <TeamCard
              data={{
                ...team,
                featured_image: team.featured_image as GalleryItem,
              }}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default AboutTeamSection;
