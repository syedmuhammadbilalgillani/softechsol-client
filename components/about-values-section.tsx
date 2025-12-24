"use client";

import { motion, Variants } from "framer-motion";
import Heading from "./heading";

interface ValueItem {
  label: string;
  description: string;
}

const AboutValuesSection = ({ data }: { data: ValueItem[] }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      aria-labelledby="core-values"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Heading as="h2" title="Our Values" />
      </motion.div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        {data.map((item, index) => (
          <article
            key={index}
            // variants={itemVariants}
            // whileHover={{ scale: 1.02, y: -5 }}
            // transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`md:p-10 py-10 max-md:border-b ${
              index % 2 === 0 ? "md:border-r-2 " : ""
            } ${index >= 2 ? "md:border-t-2 " : ""}`}
          >
            <h3 className="text-2xl font-bold">{item.label}</h3>
            <p className="text-lg">{item.description}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default AboutValuesSection;
