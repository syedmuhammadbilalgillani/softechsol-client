"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Heading from "./heading";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Award,
} from "lucide-react";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const AboutBanner = () => {
  return (
    <section
      aria-labelledby="about-banner-heading"
      className="main py-12 md:py-16"
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Left Column: Visual with Floating Trust Badge */}
        <motion.div
          className="lg:col-span-5 relative"
          variants={imageVariants}
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main Image Frame */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100">
              <Image
                src="/about_us_banner.jpg"
                alt="SoftechSol engineering and development team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1227]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Trust Metric Card */}
            <div className="absolute -bottom-6 -right-3 sm:-bottom-6 sm:right-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 shadow-xl max-w-[260px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0054a0]/10 text-[#0054a0] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Proven Track Record
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    50+ Completed Projects
                  </p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>98% Client Satisfaction</span>
                <span className="text-emerald-600 font-semibold">5+ Yrs Exp</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Authentic Humanized Story & Value Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={itemVariants} className="space-y-3">
            <Heading title="About SoftechSol" />
            <h2
              id="about-banner-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
            >
              We Build Software That Works —{" "}
              <span className="text-[#0054a0]">
                Without The Agency Fluff or Bloated Price Tags
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            <p>
              We founded SoftechSol after seeing businesses waste months and tens of thousands of dollars on agencies that outsourced their work, made false promises, or handed over fragile code that broke after launch.
            </p>
            <p className="text-sm sm:text-base text-slate-700">
              When you partner with us, you work directly with experienced software engineers and product designers who understand real-world business objectives. No sales middlemen playing telephone—just transparent milestones, weekly progress demos, and reliable software engineered to grow with you.
            </p>
          </motion.div>

          {/* 3 Value Pillars (Plain English, Zero Emojis) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0054a0]">
                <Users className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Direct Access
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Speak directly with the engineers building your product.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0054a0]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  You Own Everything
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                100% of your software, files, and server accounts belong to you. Zero lock-in.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0054a0]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Fixed Milestones
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Clear 2-week sprint deliverables with zero surprise billing.
              </p>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#0054a0] hover:bg-[#004380] text-white font-semibold shadow-md shadow-[#0054a0]/25 transition-all duration-200"
            >
              <Link href="/about" className="flex items-center gap-2">
                Learn Our Story & Meet The Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-gray-950 font-medium transition-all"
            >
              <Link href="/contact">
                Talk to an Engineer
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutBanner;
