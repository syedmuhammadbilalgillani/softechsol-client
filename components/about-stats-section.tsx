"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const AnimatedCounter = ({ 
  value, 
  suffix = "", 
  className = "text-3xl font-semibold mb-1" 
}: { 
  value: number; 
  suffix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div className={className}>
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </motion.div>
    </motion.div>
  );
};

const AboutStatsSection = () => {
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

  return (
    <motion.section
      className="main grid md:grid-cols-2 grid-cols-1 place-items-center py-10 md:gap-[10%] gap-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className="flex gap-6" variants={itemVariants}>
        <div>
          <AnimatedCounter value={500} suffix="+" />
          <div>Brands Crafted</div>
        </div>
        <div>
          <AnimatedCounter value={5} suffix="+" />
          <div>Years of Experience</div>
        </div>
        <div>
          <AnimatedCounter value={98} suffix="%" />
          <div>Client Satisfaction Rate</div>
        </div>
      </motion.div>
      <motion.p
        className="text-xl"
        variants={itemVariants}
      >
        We are a team of passionate designers, strategists, and innovators
        committed to transforming ideas into compelling digital experiences.
        Creativity drives us, results define us.
      </motion.p>
    </motion.section>
  );
};

export default AboutStatsSection;
