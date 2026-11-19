"use client";
import React, { useRef, useState, useEffect } from "react";
import { whyChooseUs } from "@/constants/data";
import Heading from "./heading";
import {
  Clock,
  Rocket,
  MessageSquare,
  Target,
  ShieldCheck,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "./ui/button";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  rocket: Rocket,
  message: MessageSquare,
  target: Target,
  shield: ShieldCheck,
  users: Users,
};

const TestimonialSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section aria-label="Our Delivery Promise" className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="main space-y-10 md:space-y-12">
        {/* Section Header with Desktop Scroll Controls on smaller viewports */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="space-y-3 max-w-2xl">
            <Heading
              as="div"
              title="Our Promise"
              className="text-primary"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              The SoftechSol Delivery Framework
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Software partnerships should be predictable and honest. Here are the 4 commitments we make to every client from day one.
            </p>
          </div>

          {/* Glide Controls for mobile & tablet */}
          <div className="flex lg:hidden items-center gap-2 self-start sm:self-end shrink-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full w-9 h-9 border-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="rounded-full w-9 h-9 border-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Single Row Connected Track (4 Cards in 1 Row with Continuous Timeline) */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap lg:grid lg:grid-cols-4 items-stretch gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 px-1"
        >
          {whyChooseUs.map((item, idx) => {
            const Icon = iconMap[item.icon] ?? Rocket;
            const isFirst = idx === 0;
            const isLast = idx === whyChooseUs.length - 1;
            const isPenultimate = idx === whyChooseUs.length - 2;

            return (
              <div
                key={item.step}
                className="w-[280px] sm:w-[300px] lg:w-auto shrink-0 flex flex-col group select-none"
              >
                {/* 1. Step Number */}
                <div className="text-center mb-1">
                  <span
                    className={`block text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-200 ${
                      isFirst
                        ? "text-primary"
                        : "text-slate-300 group-hover:text-primary"
                    }`}
                  >
                    {item.step}
                  </span>
                </div>

                {/* 2. Connected Line & Node (Matching Premier Salt timeline screenshot) */}
                <div className="relative flex items-center justify-center my-3.5">
                  {/* Left Line Segment */}
                  <div
                    className={`absolute left-0 right-1/2 h-[2px] transition-colors ${
                      isFirst
                        ? "opacity-0"
                        : isLast
                        ? "border-t-2 border-dashed border-primary"
                        : "bg-slate-800 group-hover:bg-primary"
                    }`}
                  />

                  {/* Right Line Segment */}
                  <div
                    className={`absolute left-1/2 right-0 h-[2px] transition-colors ${
                      isLast
                        ? "opacity-0"
                        : isPenultimate
                        ? "border-t-2 border-dashed border-primary"
                        : "bg-slate-800 group-hover:bg-primary"
                    }`}
                  />

                  {/* Center Node Dot */}
                  <div className="relative z-10 flex items-center justify-center">
                    {isFirst ? (
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-30" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-primary ring-4 ring-primary/20" />
                      </span>
                    ) : (
                      <span className="h-4 w-4 rounded-full border-2 border-slate-700 bg-white group-hover:border-primary group-hover:scale-125 transition-all shadow-xs" />
                    )}
                  </div>
                </div>

                {/* 3. Phase Label */}
                <div className="text-center mb-4">
                  <span
                    className={`text-xs sm:text-sm font-semibold transition-colors ${
                      isFirst
                        ? "text-primary"
                        : "text-slate-600 group-hover:text-primary"
                    }`}
                  >
                    {item.phase}
                  </span>
                </div>

                {/* 4. Humanized Connected Card */}
                <article className="flex-1 rounded-2xl p-6 border border-slate-200/90 bg-white shadow-sm hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    {/* Icon & Phase Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Phase {item.step}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Deliverable Guarantee */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{item.deliverable}</span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
