import Heading from "./heading";
import Link from "next/link";
import { getAllServiceCategories } from "@/constants/services";
import { ArrowUpRight } from "lucide-react";

const ServicesSection = () => {
  const categories = getAllServiceCategories();

  return (
    <main className="bg-darkblue rounded-2xl">
      <section
        aria-labelledby="services-section"
        className="md:px-10 px-5 py-12 md:py-16 space-y-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <Heading className="text-white" title="Our Services" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Smart Digital Solutions for Growing Businesses
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl">
              From fast websites and mobile apps to custom automations and AI—we deliver
              custom software that solves real business challenges in plain English.
            </p>
          </div>
          <Link
            href="/services"
            className="text-white hover:text-primary transition-colors text-sm font-medium flex items-center gap-1 shrink-0"
          >
            View All Services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-white/10">
          {categories.map((item, index) => (
            <Link
              key={item.id}
              href={`/services/${item.slug}`}
              className="flex group relative items-center justify-between py-8 transition-colors duration-300 hover:text-primary no-underline"
            >
              <div className="space-y-2 max-w-xl">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {String(index + 1).padStart(2, "0")} / 06
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm md:text-base text-slate-300 line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="flex items-center">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-primary group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesSection;
