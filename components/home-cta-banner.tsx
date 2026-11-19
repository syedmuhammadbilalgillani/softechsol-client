import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export const HomeCtaBanner = () => {
  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="main my-16 md:my-20"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#0c1227] text-white p-8 md:p-14 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#0054a0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-[#0054a0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/40 text-xs font-semibold uppercase tracking-wider">
            Start Your Project
          </span>

          <h2
            id="cta-banner-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            Ready to Build Software That{" "}
            <span className="text-sky-400">Drives Real Business Growth?</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            No sales middlemen playing telephone, no bloated agency pricing. Discuss your project directly with our senior engineers and receive a transparent, fixed-price milestone roadmap.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#0054a0] hover:bg-[#004380] text-white font-semibold shadow-lg shadow-[#0054a0]/30 transition-all duration-200 h-12 px-7 text-base"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-[#0e1630] hover:bg-slate-800 text-white border border-slate-700/80 font-medium transition-all duration-200 h-12 px-6 text-base"
            >
              <a
                href="https://wa.me/923062993712"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* 3 Guarantees Chips */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>100% Code &amp; Asset Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Transparent 2-Week Sprints</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>30-Day Post-Launch Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCtaBanner;
