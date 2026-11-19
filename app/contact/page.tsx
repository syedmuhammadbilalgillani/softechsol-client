import ContactForm from "@/components/contact-form";
import ClientTrustStrip from "@/components/client-trust-strip";
import { DOMAIN_URL, MAP_URL, socialMediaLinks } from "@/constants/url";
import { getAllServicesList } from "@/constants/services";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Users2,
  Sparkles,
  Lock,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SoftechSol for custom websites, mobile apps, and business automation. Tell us about your project and receive a fast, friendly response within 24 hours.",
  openGraph: {
    title: "Contact Us | SoftechSol",
    description:
      "Get in touch with SoftechSol for custom websites, mobile apps, and business automation. Tell us about your project and receive a fast, friendly response within 24 hours.",
    url: `${DOMAIN_URL}/contact`,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact SoftechSol",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | SoftechSol",
    description:
      "Get in touch with SoftechSol for custom websites, mobile apps, and business automation.",
    images: [`${DOMAIN_URL}/contact.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contact",
  },
};

const ContactUsPage = () => {
  const services = getAllServicesList();

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-18  pb-8 text-gray-900 ">
      <div className="main space-y-12">
        {/* Top Heading (Direct on page, Devsinc-style, no separate hero box) */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Your Project</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Let&apos;s Talk About Your Project
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Tell us what you want to create or improve. Whether it&apos;s a new website, a mobile app, or smart software to save your team hours every day &mdash; we&apos;ll give you honest advice, a clear plan, and a realistic estimate.
          </p>
        </div>

        {/* Two-Column Grid: Form + Simple Reassurance & Offices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Friendly Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-9 shadow-lg shadow-slate-100 border border-slate-200">
            <div className="mb-6 space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                Fill in your details below and a senior member of our team will reply within 24 hours.
              </p>
            </div>

            <ContactForm services={services as any} />
          </div>

          {/* Right Column: Friendly Expectations & Offices (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: How We Work With You */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>What to Expect From Us</span>
              </h3>
              <ul className="space-y-3.5 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">Real builders, no salespeople</strong>
                    You&apos;ll talk with someone who actually builds software &mdash; no pushy sales pitches or confusing technical jargon.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">Fast reply within 24 hours</strong>
                    We respect your time. You will get a thoughtful reply with honest suggestions and next steps within 1 business day.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-gray-900 block font-semibold">Your idea is 100% safe</strong>
                    We respect your privacy. If you prefer, we will gladly sign a Non-Disclosure Agreement (NDA) before you share any details.
                  </div>
                </li>
              </ul>
            </div>

            {/* Card 2: Offices & Direct WhatsApp */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Visit or Call Us
                </h3>
                <span className="text-xs font-medium text-gray-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                  US & Pakistan
                </span>
              </div>

              <div className="space-y-4">
                {/* United States Office */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/usaflaglogo.webp"
                      alt="United States Office"
                      width={24}
                      height={16}
                      className="rounded-xs shrink-0"
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      United States Office
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{socialMediaLinks.usAddress}</span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a
                      href={`tel:${socialMediaLinks.usPhoneNumber}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {socialMediaLinks.usPhoneNumber}
                    </a>
                  </div>
                </div>

                {/* Pakistan Office (WhatsApp direct) */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/pakistanlogo.webp"
                      alt="Pakistan Engineering Hub"
                      width={24}
                      height={16}
                      className="rounded-xs shrink-0"
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      Pakistan Development Office
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{socialMediaLinks.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={`https://wa.me/${socialMediaLinks.phone.replace(/[^0-9]/g, "")}?text=Hello%20SoftechSol,%20I'd%20like%20to%20discuss%20a%20project`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Looking for a job? (Careers Routing) */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Looking for a Job Instead?</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are a developer, designer, or AI specialist looking to join our team, please use our careers portal instead of this project form.
              </p>
              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 group"
                >
                  <span>View Open Positions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="mailto:info@softechsol.com"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>info@softechsol.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Non-Tech Friendly Numbers */}
        <div className="pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                100+
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                Projects Successfully Built
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                24 Hours
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                Fast Response Guarantee
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                100%
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                You Own Your Code & Assets
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                5 / 5
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentic Client Trust Strip */}
      <div className="mt-16">
        <ClientTrustStrip variant="light" />
      </div>
    </main>
  );
};

export default ContactUsPage;
