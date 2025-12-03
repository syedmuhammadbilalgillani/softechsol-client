"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Heading from "./heading";
import { Button } from "./ui/button";
import Link from "next/link";

const AboutBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.main
      className="main py-10 grid md:grid-cols-2 grid-cols-1 place-items-center gap-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className="space-y-4" variants={itemVariants as Variants}>
        <Heading title="About Us" />
        <motion.div variants={imageVariants as Variants}>
          <Image
            src="/about_us_banner.jpg"
            alt="About Us"
            width={500}
            height={500}
            className="rounded-xl"
            sizes="(max-width: 768px) 100vw, 500px"
            quality={85}
          />
        </motion.div>
      </motion.div>
      <motion.div className="space-y-4" variants={itemVariants as Variants}>
        <motion.p
          className="text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          We are a team of passionate designers, strategists, and innovators
          committed to transforming ideas into compelling digital experiences.
          Creativity drives us, results define us.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant={"outline"} asChild>
              <Link href={`/about`}>Read More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default AboutBanner;
