import Image from "next/image";
import Heading from "./heading";

const ServicesSection = () => {
  return (
    <main className="bg-darkblue rounded-2xl ">
      <section
        aria-labelledby="services-section"
        className="md:px-10 px-5 py-10 space-y-8"
      >
        <Heading className="text-white" title="Our Services" />
        <div>
          {[
            {
              title: "Brand Strategy & Identity",
              description: "Discovery, logo, colors, guidelines.",
              icon: "/team/1.png", // Replace with actual icon path
            },
            {
              title: "UI/UX Design",
              description: "Website, mobile, wireframes, testing.",
              icon: "/team/1.png", // Replace with actual icon path
            },
            {
              title: "Website Design & Development",
              description: "Design, Webflow, Framer, responsive.",
              icon: "/team/1.png", // Replace with actual icon path
            },
            {
              title: "Creative Content",
              description: "Copy, visuals, social.",
              icon: "/team/1.png", // Replace with actual icon path
            },
            {
              title: "Ongoing Support",
              description: "Maintenance, systems, growth.",
              icon: "/team/1.png", // Replace with actual icon path
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex relative items-center group justify-between space-x-6 py-10 border-b  text-white"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <div className="absolute left-1/2 w-32 h-32">
                <Image
                  className="object-contain rounded-xl rotate-12 scale-0 group-hover:scale-100 transition-all duration-300 "
                  src={item.icon}
                  alt={item.title}
                  layout="fill"

                />
              </div>
              <p className="text-lg text-white">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesSection;
