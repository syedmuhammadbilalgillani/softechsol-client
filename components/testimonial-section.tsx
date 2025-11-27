import React from "react";
import Heading from "./heading";
import { Slider } from "./slider";
import { testimonials } from "@/constants/data";
import TestimonialCard from "./testimonial-card";

const TestimonialSection = () => {
  return (
    <main className="main py-10">
      <section aria-labelledby="testimonials-section" className="space-y-5">
        <Heading title="Testimonials" />
        <Slider
          logos={testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              designation={testimonial.designation}
              description={testimonial.description}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
          speed={400}
          pauseOnHover={true}
        />
      </section>
    </main>
  );
};

export default TestimonialSection;
