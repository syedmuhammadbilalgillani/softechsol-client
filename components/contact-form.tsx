"use client";
import { ContactAction } from "@/actions/contact";
import { Service } from "@/app/generated/prisma";
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import ServiceSelector from "./service-selector";
import { Button } from "./ui/button";

// DoS protection: Maximum field lengths
const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321 limit
  phone: 20,
  message: 5000,
} as const;

const ContactForm = ({ services }: { services: Service[] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const MAX_SUBMIT_ATTEMPTS = 5; // Prevent rapid-fire submissions
  const SUBMIT_COOLDOWN_MS = 60000; // 1 minute cooldown after max attempts
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Get reCAPTCHA site key
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const validateFormData = (formData: FormData): string | null => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const message = formData.get("message") as string | null;

    // Check field lengths
    if (name && name.length > MAX_FIELD_LENGTHS.name) {
      return `Name must be less than ${MAX_FIELD_LENGTHS.name} characters`;
    }
    if (email && email.length > MAX_FIELD_LENGTHS.email) {
      return `Email must be less than ${MAX_FIELD_LENGTHS.email} characters`;
    }
    if (phone && phone.length > MAX_FIELD_LENGTHS.phone) {
      return `Phone must be less than ${MAX_FIELD_LENGTHS.phone} characters`;
    }
    if (message && message.length > MAX_FIELD_LENGTHS.message) {
      return `Message must be less than ${MAX_FIELD_LENGTHS.message} characters`;
    }

    // Check for suspicious patterns (basic DoS detection)
    const suspiciousPatterns = [
      /(.)\1{50,}/, // Repeated characters (e.g., "aaaaaaaa...")
      /<script|javascript:|onerror=|onload=/i, // XSS attempts
    ];

    const allFields = [name, email, phone, message].filter(Boolean).join(" ");
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allFields)) {
        return "Invalid input detected. Please check your submission.";
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rate limiting: Check cooldown period
    const now = Date.now();
    if (submitAttempts >= MAX_SUBMIT_ATTEMPTS) {
      const timeSinceLastSubmit = now - lastSubmitTime;
      if (timeSinceLastSubmit < SUBMIT_COOLDOWN_MS) {
        const remainingSeconds = Math.ceil(
          (SUBMIT_COOLDOWN_MS - timeSinceLastSubmit) / 1000
        );
        toast.error(
          `Too many submission attempts. Please wait ${remainingSeconds} seconds before trying again.`
        );
        return;
      } else {
        // Reset attempts after cooldown
        setSubmitAttempts(0);
      }
    }

    // Get reCAPTCHA token
    if (!recaptchaSiteKey) {
      toast.error("reCAPTCHA is not configured. Please contact support.");
      setIsSubmitting(false);
      return;
    }
    
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add reCAPTCHA token to form data
    formData.append("recaptchaToken", recaptchaToken);

    // Client-side validation
    const validationError = validateFormData(formData);
    if (validationError) {
      toast.error(validationError);
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
      return;
    }

    try {
      const result = await ContactAction(formData);

      if (result.success) {
        toast.success("Form submitted successfully!");
        form.reset(); // Reset form on success
        recaptchaRef.current?.reset(); // Reset reCAPTCHA
        setSubmitAttempts(0); // Reset attempts on success
        setLastSubmitTime(now);
      } else {
        toast.error(result.error || "Failed to submit form");
        recaptchaRef.current?.reset(); // Reset reCAPTCHA on error
        setSubmitAttempts((prev) => prev + 1);
        setLastSubmitTime(now);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      recaptchaRef.current?.reset(); // Reset reCAPTCHA on error
      setSubmitAttempts((prev) => prev + 1);
      setLastSubmitTime(now);
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
          maxLength={MAX_FIELD_LENGTHS.name}
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
          maxLength={MAX_FIELD_LENGTHS.email}
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
          maxLength={MAX_FIELD_LENGTHS.phone}
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
          maxLength={MAX_FIELD_LENGTHS.message}
          required
        />
      </div>

      {recaptchaSiteKey ? (
        <div className="md:col-span-2 col-span-1 flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            theme="light"
          />
        </div>
      ) : (
        <div className="md:col-span-2 col-span-1">
          <p className="text-yellow-500 text-sm text-center">
            reCAPTCHA is not configured. Form submission may be limited.
          </p>
        </div>
      )}

      <div className="md:col-span-2 col-span-1">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;