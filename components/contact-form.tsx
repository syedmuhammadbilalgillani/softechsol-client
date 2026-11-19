"use client";
import { ContactAction } from "@/actions/contact";
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import ServiceSelector, { ServiceOption } from "./service-selector";
import { Button } from "./ui/button";
import { ShieldCheck, Clock, Send, Loader2, Sparkles } from "lucide-react";

// DoS protection: Maximum field lengths
const MAX_FIELD_LENGTHS = {
  name: 100,
  company: 150,
  email: 254, // RFC 5321 limit
  phone: 35,
  message: 5000,
} as const;

const COUNTRY_CODES = [
  { code: "+1", label: "+1 (US / CA)" },
  { code: "+92", label: "+92 (PK)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+966", label: "+966 (KSA)" },
  { code: "+61", label: "+61 (AU)" },
  { code: "+49", label: "+49 (DE)" },
  { code: "+33", label: "+33 (FR)" },
  { code: "+974", label: "+974 (QA)" },
  { code: "+965", label: "+965 (KW)" },
  { code: "+968", label: "+968 (OM)" },
  { code: "+91", label: "+91 (IN)" },
  { code: "+65", label: "+65 (SG)" },
  { code: "", label: "Other" },
];

const ContactForm = ({ services }: { services: ServiceOption[] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const MAX_SUBMIT_ATTEMPTS = 5;
  const SUBMIT_COOLDOWN_MS = 60000;
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Get reCAPTCHA site key
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const validateFormData = (formData: FormData): string | null => {
    const name = formData.get("name") as string;
    const company = formData.get("company") as string | null;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const message = formData.get("message") as string | null;

    if (!name || !name.trim()) {
      return "Please enter your name.";
    }
    if (!email || !email.trim()) {
      return "Please enter your email address.";
    }
    if (!message || !message.trim()) {
      return "Please tell us what you'd like to build or improve.";
    }

    // Check field lengths
    if (name && name.length > MAX_FIELD_LENGTHS.name) {
      return `Name must be less than ${MAX_FIELD_LENGTHS.name} characters`;
    }
    if (company && company.length > MAX_FIELD_LENGTHS.company) {
      return `Company must be less than ${MAX_FIELD_LENGTHS.company} characters`;
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

    // Suspicious pattern check
    const suspiciousPatterns = [
      /(.)\1{50,}/,
      /<script|javascript:|onerror=|onload=/i,
    ];

    const allFields = [name, company, email, phone, message].filter(Boolean).join(" ");
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allFields)) {
        return "Invalid input detected. Please check your submission.";
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rate limiting check
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
        setSubmitAttempts(0);
      }
    }

    // Check reCAPTCHA
    if (!recaptchaSiteKey) {
      toast.error("reCAPTCHA is not configured. Please contact support.");
      setIsSubmitting(false);
      return;
    }

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification below.");
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Format phone with country code
    const fullPhone = phoneNumber.trim()
      ? `${selectedCountryCode ? `${selectedCountryCode} ` : ""}${phoneNumber.trim()}`
      : "";
    if (fullPhone) {
      formData.set("phone", fullPhone);
    } else {
      formData.delete("phone");
    }

    // Append reCAPTCHA token
    formData.append("recaptchaToken", recaptchaToken);

    // Client-side validation
    const validationError = validateFormData(formData);
    if (validationError) {
      console.warn("[Contact Form Client] Validation error:", validationError);
      toast.error(validationError);
      setIsSubmitting(false);
      recaptchaRef.current?.reset();
      return;
    }

    console.log("[Contact Form Client] Submitting contact form...", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: fullPhone,
      company: formData.get("company"),
      service: formData.get("service"),
      hasToken: Boolean(recaptchaToken),
    });

    try {
      const result = await ContactAction(formData);
      console.log("[Contact Form Client] ContactAction response:", result);

      if (result.success) {
        toast.success("Thank you! We received your message and will reply within 24 hours.");
        form.reset();
        setPhoneNumber("");
        setSelectedCountryCode("+1");
        recaptchaRef.current?.reset();
        setSubmitAttempts(0);
        setLastSubmitTime(now);
      } else {
        console.error("[Contact Form Client] Submission failed:", result.error);
        toast.error(result.error || "Failed to submit. Please try again.");
        recaptchaRef.current?.reset();
        setSubmitAttempts((prev) => prev + 1);
        setLastSubmitTime(now);
      }
    } catch (error) {
      console.error("[Contact Form Client] Unexpected submission exception:", error);
      toast.error("An unexpected error occurred. You can also message us directly on WhatsApp.");
      recaptchaRef.current?.reset();
      setSubmitAttempts((prev) => prev + 1);
      setLastSubmitTime(now);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="col-span-1">
        <label
          htmlFor="name"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
        >
          Your Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="e.g. Alex Morgan"
          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-gray-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          maxLength={MAX_FIELD_LENGTHS.name}
          required
        />
      </div>

      {/* Company / Business Name */}
      <div className="col-span-1">
        <label
          htmlFor="company"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
        >
          Company or Business Name
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="e.g. Acme Corp (optional)"
          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-gray-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          maxLength={MAX_FIELD_LENGTHS.company}
        />
      </div>

      {/* Email Address */}
      <div className="col-span-1">
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
        >
          Email Address <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="alex@company.com"
          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-gray-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          title="Please enter a valid email address"
          maxLength={MAX_FIELD_LENGTHS.email}
          required
        />
      </div>

      {/* Phone with Country Code */}
      <div className="col-span-1">
        <label
          htmlFor="phone-input"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
        >
          Phone / WhatsApp Number
        </label>
        <div className="flex gap-2">
          <select
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
            className="w-32 bg-white border border-slate-300 rounded-lg px-2.5 py-2.5 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer shrink-0"
            aria-label="Country Code"
          >
            {COUNTRY_CODES.map((item) => (
              <option key={item.label} value={item.code} className="bg-white text-gray-900">
                {item.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="555 123 4567"
            className="flex-1 min-w-0 bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-gray-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            maxLength={25}
          />
        </div>
      </div>

      {/* Service Selector */}
      <div className="col-span-1 md:col-span-2">
        <ServiceSelector services={services} />
      </div>

      {/* What do you want to build? */}
      <div className="col-span-1 md:col-span-2">
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
        >
          Tell us about what you want to build or improve <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Describe your idea in simple words. What does your business do, what are you trying to build, or what problem can we help you solve?"
          className="w-full bg-white border border-slate-300 rounded-lg p-3.5 text-gray-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
          rows={4}
          maxLength={MAX_FIELD_LENGTHS.message}
          required
        />
      </div>

      {/* Trust & Reassurance Badges */}
      <div className="col-span-1 md:col-span-2 flex flex-wrap items-center gap-4 py-2.5 border-y border-slate-200 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>Your Idea Stays 100% Private (NDA Available)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span>Reply Within 1 Business Day</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <span>Free, Friendly Consultation</span>
        </div>
      </div>

      {/* reCAPTCHA */}
      {recaptchaSiteKey ? (
        <div className="col-span-1 md:col-span-2 flex justify-center py-1">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            theme="light"
          />
        </div>
      ) : (
        <div className="col-span-1 md:col-span-2 text-center text-xs text-amber-600">
          reCAPTCHA is not configured in this environment.
        </div>
      )}

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2 space-y-2">
        <Button
          type="submit"
          className="w-full py-3.5 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-base shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Your Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
        <p className="text-center text-[11px] text-gray-500">
          No pushy sales calls. A senior member of our team will review your message and reply personally.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
