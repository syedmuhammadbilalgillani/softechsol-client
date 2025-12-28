"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";

const AnimatedCounter = ({
  value,
  suffix = "",
  className = "text-3xl font-semibold mb-1",
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
  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest)
  );

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
      className="main py-10 gap-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className="flex md:flex-nowrap flex-wrap gap-6 justify-between" variants={itemVariants as Variants}>
        <div className="border shadow  w-full px-6 py-4 rounded-xl md:text-start text-center">
          <AnimatedCounter value={20} suffix="+" />
          <div className="text-muted-foreground text-lg font-normal">Happy Clients</div>
        </div>
        <div className="border shadow  w-full px-6 py-4 rounded-xl md:text-start text-center">
          <AnimatedCounter value={50} suffix="+" />
          <div className="text-muted-foreground text-lg font-normal">Projects Completed</div>
        </div>
        <div className="border shadow  w-full px-6 py-4 rounded-xl md:text-start text-center">
          <AnimatedCounter value={7} suffix="+" />
          <div className="text-muted-foreground text-lg font-normal">Years of Experience</div>
        </div>
        <div className="border shadow  w-full px-6 py-4 rounded-xl md:text-start text-center">
          <AnimatedCounter value={100} suffix="%" />
          <div className="text-muted-foreground text-lg font-normal">Client Satisfaction Rate</div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutStatsSection;
