"use client";

import React, { useEffect, useRef } from "react";
import Heading from "./heading";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  Variants,
} from "framer-motion";
import Link from "next/link";

const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const displayValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      displayValue.set(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue, displayValue]);

  return (
    <motion.p
      ref={ref}
      className="text-5xl text-[#0054a0] font-bold"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
      }
      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
    >
      <motion.span>{displayValue}</motion.span>%
    </motion.p>
  );
};

const BenifitsBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const benefitItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.main
      className="main py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.section
        aria-labelledby="benefits-section"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants as Variants}>
          <Heading title="Benefits" />
          <h3 className="text-3xl font-bold pb-5" id="benefits-title">
            Your Vision, Scaled For Growth
          </h3>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-8 sm:grid-cols-6 grid-cols-1 gap-5"
          variants={containerVariants}
        >
          <motion.section
            className="space-y-2 col-span-3"
            aria-labelledby="benefits-list"
            variants={itemVariants as Variants}
          >
            <motion.div
              className="border border-slate-200/90 rounded-2xl p-6 sm:p-8 bg-white shadow-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                {
                  src: "/team/1.png",
                  label: "Custom Web Platform",
                },
                {
                  src: "/team/2.png",
                  label: "iOS & Android App",
                },
                {
                  src: "/team/3.png",
                  label: "Automated Workflow",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={benefitItemVariants as Variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex relative z-1 items-center justify-between gap-2 border p-3 border-slate-200 bg-white rounded-xl shadow-md cursor-pointer transition-shadow mb-3 ${
                    index === 1 ? "-rotate-2" : ""
                  } ${index === 2 ? "z-2" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={item.src}
                        className="rounded-full w-9 h-9 object-cover border border-slate-200"
                        alt={`${item.label} icon`}
                        width={100}
                        height={100}
                      />
                    </motion.div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  </div>
                  <motion.div
                    className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 py-1 text-xs font-semibold rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delivered
                  </motion.div>
                </motion.div>
              ))}
              <motion.div
                className="space-y-2 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h4 className="text-xl font-bold text-gray-900">Rapid 2-Week Sprints</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Experience fast milestone delivery with weekly live staging demos and uncompromising engineering quality.
                </p>
                <div className="pt-2">
                  <Button asChild className="border-slate-300 text-slate-800 hover:bg-slate-50 font-medium" variant="outline">
                    <Link href={`/services`}>Explore All Services</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section
            className="relative h-full col-span-3 min-h-[400px]"
            aria-labelledby="hero-image"
            variants={imageVariants as Variants}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src="/benifits_hero.jpg"
                alt="SoftechSol engineering and client outcomes"
                fill
                className="rounded-2xl object-cover border border-slate-200/80 shadow-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
            </motion.div>
          </motion.section>

          <motion.section
            className="col-span-2 space-y-5"
            variants={containerVariants}
          >
            <motion.div
              className="border border-slate-200/90 bg-white shadow-sm rounded-2xl px-6 py-6 h-1/2 flex flex-col justify-between"
              variants={statCardVariants as Variants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-2">
                  Client Satisfaction Rate
                </h4>
                <AnimatedCounter value={98} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Delivered on time with clean code, zero lock-in, and 30-day warranty.
              </p>
            </motion.div>

            <motion.div
              className="border border-slate-200/90 bg-white shadow-sm rounded-2xl px-6 py-6 h-1/2 flex flex-col justify-between"
              variants={statCardVariants as Variants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3">Trusted Worldwide</h4>
                <motion.div
                  className="flex items-center -space-x-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                >
                  {[
                    { src: "/team/4.png", label: "USA" },
                    { src: "/team/5.png", label: "UK" },
                    { src: "/team/6.png", label: "Australia" },
                    { src: "/team/7.png", label: "Canada" },
                    { src: "/team/8.png", label: "Pakistan" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200,
                          },
                        },
                      }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Image
                        className="rounded-full border-2 border-white shadow-xs"
                        src={item.src}
                        alt={`${item.label} flag`}
                        width={35}
                        height={35}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Building custom software solutions for clients across 20+ countries.
              </p>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default BenifitsBanner;
