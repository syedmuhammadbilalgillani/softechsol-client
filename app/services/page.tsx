import Heading from "@/components/heading";
import ArrowRight from "@/components/svgs/arrow-right";
import TestimonialSection from "@/components/testimonial-section";
import { data } from "@/constants/data";
import { fetchCategoriesWithServices } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";
import { Briefcase, FolderOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive software solutions all in one place. Explore SoftechSol's wide range of services including web development, mobile app development, custom software solutions, and digital transformation services.",
  openGraph: {
    title: "Services | SoftechSol",
    description:
      "Comprehensive software solutions all in one place. Explore SoftechSol's wide range of services including web development, mobile app development, and custom software solutions.",
    url: `${DOMAIN_URL}/services`,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/home_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "SoftechSol Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | SoftechSol",
    description:
      "Comprehensive software solutions all in one place. Explore SoftechSol's wide range of services.",
    images: [`${DOMAIN_URL}/home_hero.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/services",
  },
};

const ServicesPage = async () => {
  const categories = await fetchCategoriesWithServices();
  logger.info(categories, "categories");

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;

  return (
    <main className="main py-10 md:py-16">
      {/* Header Section */}
      <section className="text-center space-y-4 mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Comprehensive Solutions all in one place
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Explore our wide range of services designed to transform your business and drive digital innovation.
        </p>
      </section>

      {/* Services Categories Section */}
      {!hasCategories ? (
        <section className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
          <div className="bg-gray-50 rounded-full p-6 mb-6">
            <Briefcase className="w-16 h-16 text-gray-400" aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 text-center">
            No Services Available
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            We're currently updating our services. Check back soon to explore our comprehensive solutions.
          </p>
          <Link href="/contact" aria-label="Contact us">
            <Button variant="outline" size="lg">
              Get in Touch
            </Button>
          </Link>
        </section>
      ) : (
        <section className="space-y-12 md:space-y-16">
          {categories.map((item: any, index: number) => {
            const hasServices = item.services && Array.isArray(item.services) && item.services.length > 0;
            
            return (
              <div key={item?.id || index} className="space-y-6 md:space-y-8">
                <Heading title={item.name} />
                <div className="grid md:grid-cols-3 grid-cols-1 gap-0 dden">
                  {!hasServices ? (
                    <div className="col-span-full bg-gray-50 border-0">
                      <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
                        <FolderOpen className="w-12 h-12 text-gray-400 mb-4" aria-hidden="true" />
                        <p className="text-gray-600 text-center text-lg font-medium">
                          No services available for this category
                        </p>
                        <p className="text-gray-500 text-sm text-center mt-2">
                          Check back soon for updates.
                        </p>
                      </div>
                    </div>
                  ) : (
                    item.services.map((service: any, serviceIndex: number) => (
                      <div
                        key={service?.id || serviceIndex}
                        className="col-span-1 p-6 md:p-8 border-r-2 border-b-2 last:border-r-0 last:border-b-0 md:last:border-b-2 md:nth-[3n]:border-r-0  hover:bg-gray-50 transition-colors duration-200 group relative"
                      >
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                          {service.title || "Service Title"}
                        </h3>
                        <p className="text-gray-600 line-clamp-4 leading-relaxed">
                          {service.description || "Service description not available."}
                        </p>
                        {/* Tooltip with full description */}
                        <div className="absolute left-0 right-0 top-full mt-2 p-4 bg-gray-900 text-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                          <h4 className="font-semibold text-lg mb-2 text-white">
                            {service.title || "Service Title"}
                          </h4>
                          <p className="text-gray-200 leading-relaxed text-sm">
                            {service.description || "Service description not available."}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Our Values Section */}
      <section aria-labelledby="core-values" className="mt-16 md:mt-20 space-y-8 md:space-y-12">
        <div className="space-y-4">
          <Heading as="h2" title="Our Values" />
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Us?</h3>
          <p className="text-gray-600 text-lg max-w-2xl">
            Our core values drive everything we do, ensuring exceptional results for every project.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 grid-cols-1 border-2 rounded-lg overflow-hidden">
          {data.map((item, index) => (
            <article
              key={index}
              className={`md:p-10 p-8 max-md:border-b ${
                index % 2 === 0 ? "md:border-r-2" : ""
              } ${index >= 2 ? "md:border-t-2" : ""} hover:bg-gray-50 transition-colors duration-200`}
            >
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {item.label}
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:gap-6 pt-8">
          {[
            {
              value: "500+",
              label: "Brands Crafted",
            },
            {
              value: "5+",
              label: "Years of Experience",
            },
            {
              value: "98%",
              label: "Client Satisfaction Rate",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="col-span-1 rounded-xl bg-primary/5 p-6 md:p-8 group flex items-center justify-between gap-4 hover:bg-primary transition-all duration-300 cursor-pointer"
            >
              <div>
                <h4 className="text-2xl md:text-3xl font-bold group-hover:text-white transition-colors duration-300">
                  {item.value}
                </h4>
                <p className="text-base md:text-lg text-gray-600 group-hover:text-white transition-colors duration-300 mt-1">
                  {item.label}
                </p>
              </div>
              <div className="bg-primary rounded-full p-2 md:p-3 group-hover:bg-white transition-all duration-300 flex-shrink-0">
                <ArrowRight className="size-4 md:size-5 text-white group-hover:text-black transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      {hasCategories && <TestimonialSection />}
    </main>
  );
};

export default ServicesPage;