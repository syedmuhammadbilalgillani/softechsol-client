import React from "react";
import Heading from "./heading";
import { faqs } from "@/constants/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Image from "next/image";

const FaqsSection = () => {
  return (
    <main className="main py-10">
      <section aria-labelledby="faqs-section" className="space-y-5">
        <Heading title="FAQs" />
        <section className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Image src="/faqs.jpg" className="rounded-xl" alt="FAQs" width={500} height={500} />
          </div>
          <Accordion type="multiple">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-xl font-bold">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>
    </main>
  );
};

export default FaqsSection;
