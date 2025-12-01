import Image from "next/image";
import Heading from "./heading";
import { fetchCategoriesWithServices } from "@/lib/apis";
import logger from "@/lib/logger";

const ServicesSection = async () => {
  const categories = await fetchCategoriesWithServices();
  logger.info(categories, "categories with services");
  return (
    <main className="bg-darkblue rounded-2xl ">
      <section
        aria-labelledby="services-section"
        className="md:px-10 px-5 py-10 space-y-8"
      >
        <Heading className="text-white" title="Our Services" />
        <div>
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex relative items-center group justify-between space-x-6 py-10 border-b  text-white"
            >
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <div className="absolute left-1/2 w-40 min-h-44 h-full">
                <Image
                  className="object-cover rounded-xl rotate-12 min-h-44 scale-0 group-hover:scale-100 transition-all duration-300 "
                  src={item?.image?.url || "/placeholder.svg"}
                  alt={item?.image?.altText || item?.name}
                  layout="fill"
                />
              </div>
              <p className="text-lg text-white">
                {item.services
                  .slice(0, 3)
                  .map((service) =>
                    service.title.split(" ").slice(0, 2).join(" ")
                  )
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesSection;
