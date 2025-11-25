import React from "react";
import Heading from "./heading";
import Image from "next/image";
import { Button } from "./ui/button";

const BenifitsBanner = () => {
  return (
    <main className="main py-10">
      <section aria-labelledby="benefits-section">
        <Heading title="Benefits" />
        <h3 className="text-3xl font-bold pb-5" id="benefits-title">
          Your Vision, Scaled For Growth
        </h3>

        <div className="grid md:grid-cols-8 sm:grid-cols-6 grid-cols-1 gap-5">
          <section
            className="space-y-2 col-span-3"
            aria-labelledby="benefits-list"
          >
            <div className="border border-gray-400 rounded-xl px-5 py-10">
              {[
                {
                  src: "/team/1.png",
                  label: "Brand Identity",
                },
                {
                  src: "/team/2.png",
                  label: "Website Redesign",
                },
                {
                  src: "/team/3.png",
                  label: "Wire-Frame Design ",
                },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`flex relative z-1 items-center justify-between gap-2 border p-2 py-3 border-gray-400 bg-white rounded-lg shadow-xl ${
                    index === 1 ? "-rotate-3" : ""
                  } ${index === 2 ? "z-2" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.src}
                      className="rounded-full w-10 h-10"
                      alt={`${item.label} icon`}
                      width={100}
                      height={100}
                    />
                    <p>{item.label}</p>
                  </div>
                  <div className="bg-[#A4FA8F] text-green-900 px-4 py-1 text-sm rounded-full">
                    Completed
                  </div>
                </div>
              ))}
              <div className="space-y-1 pt-5">
                <h4 className="text-xl font-bold">Rapid Turnaround</h4>
                <p>
                  Experience rapid delivery with precision & uncompromising
                  quality
                </p>
                <Button className="px-10" variant="outline">
                  Read More
                </Button>
              </div>
            </div>
          </section>

          <section
            className="relative h-full col-span-3 min-h-[400px]"
            aria-labelledby="hero-image"
          >
            <Image
              src="/benifits_hero.jpg"
              alt="A hero image showcasing the benefits"
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={85}
            />
          </section>

          <section className="col-span-2 space-y-5">
            <div className="border border-gray-400 rounded-xl px-6 py-6 h-1/2">
              <h4 className="text-lg font-semibold mb-5">
                Client Satisfaction Rate
              </h4>
              <p className="text-5xl text-primary font-semibold">98%</p>
              <p className="text-sm text-gray-600">
                We lead to customer success; we design journeys that convert.
              </p>
            </div>

            <div className="border border-gray-400 rounded-xl px-6 py-6 h-1/2">
              <h4 className="text-lg font-semibold mb-5">Trusted Worldwide</h4>
              <div className="flex items-center -space-x-2">
                {[
                  { src: "/team/4.png", label: "USA" },
                  { src: "/team/5.png", label: "UK" },
                  { src: "/team/6.png", label: "Australia" },
                  { src: "/team/7.png", label: "Canada" },
                  { src: "/team/8.png", label: "India" },
                ].map((item, index) => (
                  <Image
                    key={index}
                    className="rounded-full"
                    src={item.src}
                    alt={`${item.label} flag`}
                    width={35}
                    height={35}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Building creative solutions for clients in 20+ countries.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default BenifitsBanner;
