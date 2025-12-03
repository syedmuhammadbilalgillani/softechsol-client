"use client";
import { ContactAction } from "@/actions/contact";
import { Service } from "@/app/generated/prisma";
import React, { useState } from "react";
import { toast } from "sonner";
import ServiceSelector from "./service-selector";
import { Button } from "./ui/button";

const ContactForm = ({ services }: { services: Service[] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await ContactAction(formData);

      if (result.success) {
        toast.success("Form submitted successfully!");
        form.reset(); // Reset form on success
      } else {
        toast.error(result.error || "Failed to submit form");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid md:grid-cols-2 grid-cols-1 gap-5" onSubmit={handleSubmit}>
      <div className="col-span-1">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div className="col-span-1">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email address (e.g., example@domain.com)"
          required
        />
      </div>

      <div className=" col-span-1">
        <label htmlFor="phone" className="block text-sm font-medium text-white">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone"
          className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          pattern="[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}"
          title="Please enter a valid phone number (e.g., +1-234-567-8900, (123) 456-7890, or 123-456-7890)"
        />
      </div>

      <ServiceSelector services={services} />

      <div className="md:col-span-2 col-span-1">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          className="mt-1 block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          rows={5}
          required
        />
      </div>

      <div className="md:col-span-2 col-span-1">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
