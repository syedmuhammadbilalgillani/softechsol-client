"use client";

import { motion } from "framer-motion";
import ImageWrapper from "./image-wrapper";

const AboutHeroSection = () => {
  return (
    <motion.section
      aria-labelledby="about-hero"
      className="relative md:h-[600px] md:min-h-[600px] md:max-h-[600px] h-[300px] min-h-[300px] max-h-[300px]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full"
      >
        <ImageWrapper
          src="/abouthero.jpg"
          alt="About Hero"
          className="object-cover rounded-xl h-full w-full"
          quality={100}
        />
      </motion.div>
    </motion.section>
  );
};

export default AboutHeroSection;
