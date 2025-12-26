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
      <motion.div variants={itemVariants}>
        <Heading as="h2" title="Our Team" />
      </motion.div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
        {teams.map((team, index) => (
          <div
            key={team.id}
            // variants={itemVariants}
            // whileHover={{ scale: 1.02, y: -5 }}
            // transition={{ type: "spring", stiffness: 300, damping: 20 }}
            // className={`  `}
          >
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
