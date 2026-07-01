import { whyChooseUs } from "@/constants/data";
import Heading from "./heading";
import { Slider } from "./slider";
import TestimonialCard from "./testimonial-card";

const TestimonialSection = () => {
  return (
    <main className="main py-10">
      <section aria-label="Our Promise" className="space-y-5">
        <Heading title="Our Promise" />
        <Slider
          logos={whyChooseUs.map((item, index) => (
            <TestimonialCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
          speed={50}
          pauseOnHover={true}
        />
      </section>
    </main>
  );
};

export default TestimonialSection;