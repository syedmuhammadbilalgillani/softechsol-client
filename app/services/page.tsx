import Heading from "@/components/heading";
import ArrowRight from "@/components/svgs/arrow-right";
import TestimonialSection from "@/components/testimonial-section";
import { data } from "@/constants/data";
import { fetchCategoriesWithServices } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";

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
  return (
    <main className="main">
      <h1 className="text-4xl font-bold text-center py-10">
        Comprehensive Solutions all in one place
      </h1>
      <section>
        {categories.map((item: any, index: number) => {
          return (
            <div key={index} className="space-y-10">
              <Heading title={item.name} />
              <div className="grid md:grid-cols-3 grid-cols-1 mb-8">
                {item.services.length === 0 ? (
                  <div className="col-span-full">
                    <p className="line-clamp-4 text-center border-b-2  py-10">
                      No services available for this category
                    </p>
                  </div>
                ) : (
                  item.services.map((service: any, index: number) => (
                    <div
                      key={index}
                      className="col-span-1 p-6 border-r-2 border-b-2 last:border-r-0 nth-[2n]:border-r-0 md:nth-[2n]:border-r-2 md:nth-[3n]:border-r-0"
                    >
                      <h3 className="text-2xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="line-clamp-4">{service.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </section>
      <section aria-labelledby="core-values">
        <Heading as="h2" title="Our Values" />
        <h3 className="text-3xl font-bold pb-5 my-3">Why Choose Us?</h3>
        <div className="grid md:grid-cols-2 grid-cols-1">
          {data.map((item, index) => (
            <article
              key={index}
              className={` md:p-10 py-10  max-md:border-b ${
                index % 2 === 0 ? "md:border-r-2 " : ""
              } ${index >= 2 ? "md:border-t-2 " : ""}`}
            >
              <h4 className="text-2xl font-bold">{item.label}</h4>
              <p className="text-lg">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 py-10">
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
              className="col-span-1 rounded-xl bg-primary/5 p-6 group flex items-center justify-between gap-2 hover:bg-primary transition-all duration-300"
            >
              <div>
                <h4 className="text-2xl font-bold group-hover:text-white">
                  {item.value}
                </h4>
                <p className="text-lg group-hover:text-white">{item.label}</p>
              </div>
              <div className="bg-primary rounded-full p-2 group-hover:bg-white transition-all duration-300">
                <ArrowRight className="size-4 text-white group-hover:text-black" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <TestimonialSection />
    </main>
  );
};

export default ServicesPage;
