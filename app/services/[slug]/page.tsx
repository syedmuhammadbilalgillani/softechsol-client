import { Button } from "@/components/ui/button";
import { DOMAIN_URL } from "@/constants/url";
import {
  getAllServiceCategories,
  getServiceCategoryBySlug,
  ServiceCategory,
} from "@/constants/services";
import {
  Check,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  Zap,
  Clock,
  Lock,
  Workflow,
  Bot,
  Palette,
  Server,
  Globe,
  Smartphone,
  Search,
  Sliders,
  Layout,
  Users,
  TrendingUp,
  Star,
  User,
  MessageSquare,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const revalidate = 3600;

export function generateStaticParams() {
  const categories = getAllServiceCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Service Not Found | SoftechSol",
      description: "The requested service category does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${category.name} | SoftechSol Services`;
  const description = category.shortDescription;
  const categoryUrl = `${DOMAIN_URL}/services/${category.slug}`;
  const ogImage = `${DOMAIN_URL}${category.image.url}`;

  return {
    title,
    description,
    metadataBase: new URL(DOMAIN_URL),
    openGraph: {
      title,
      description,
      url: categoryUrl,
      siteName: "SoftechSol",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@SoftechSol",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/services/${category.slug}`,
    },
  };
}

// Service-specific theme fallback visual (Placeholder ready for user's custom images)
const ServicePageVisualFallback = ({ category }: { category: ServiceCategory }) => {
  switch (category.id) {
    case "web-development":
      return (
        <div className="relative w-full max-w-lg mx-auto bg-[#0e1630] border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            </div>
            <div className="px-3 py-1 rounded-full bg-[#131d3d] text-xs text-slate-300 font-mono flex items-center gap-1.5 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              softechsol.com/web-portal
            </div>
            <ShieldCheck className="w-4 h-4 text-slate-400" />
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-[#131d3d] border border-slate-700/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                  Engineered Architecture
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/40 font-medium">
                  Next.js 16 + React 19
                </span>
              </div>
              <p className="text-sm font-semibold text-white">High-Speed Custom Web Platform</p>
              <p className="text-xs text-slate-300 mt-1">Lightweight, accessible, and structured for Google SEO</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0054a0]/20 text-sky-300 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">PageSpeed Score</p>
                  <p className="text-sm font-bold text-white">99 / 100</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0054a0]/20 text-sky-300 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Load Speed</p>
                  <p className="text-sm font-bold text-white">Sub-2s Fast Load</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "mobile-development":
      return (
        <div className="relative w-full max-w-sm mx-auto bg-[#0e1630] border-2 border-slate-700/70 rounded-[2.5rem] p-4 shadow-2xl">
          <div className="flex justify-center mb-3">
            <div className="w-20 h-3.5 rounded-full bg-slate-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
          </div>

          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>9:41</span>
              <span className="text-slate-300 font-medium">5G Clean</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#131d3d] border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Mobile Application</p>
              <h4 className="text-base font-bold text-white mt-1">Cross-Platform Build</h4>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                <span>Supported Stores</span>
                <span className="font-semibold text-sky-300">App Store & Play Store</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#0054a0]/20 text-sky-300 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Full Store Compliance</p>
                <p className="text-slate-400 text-[11px]">Guaranteed Review Approval</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#131d3d] border border-slate-700/40 flex items-center justify-between text-xs text-slate-300">
              <span>Verified App Rating</span>
              <span className="font-semibold text-sky-300 flex items-center gap-1">
                <Star className="w-3 h-3 fill-sky-400 text-sky-400" /> 4.9 / 5.0
              </span>
            </div>
          </div>
        </div>
      );

    case "business-automation":
      return (
        <div className="relative w-full max-w-lg mx-auto bg-[#0e1630] border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-[#0054a0]" /> Automated Data Pipeline
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              Real-Time Sync
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-[#0054a0]/20 text-sky-300 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Lead Submitted</p>
                  <p className="text-[11px] text-slate-400">Captured from website form</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">0.1s</span>
            </div>

            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-[#0054a0]/20 text-sky-300 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">CRM & WhatsApp Alert</p>
                  <p className="text-[11px] text-slate-400">Record synced and team notified</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">0.3s</span>
            </div>

            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-[#0054a0]/20 text-sky-300 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Invoice & Proposal Dispatched</p>
                  <p className="text-[11px] text-slate-400">Zero manual copying</p>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">Done</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0054a0]/15 border border-[#0054a0]/30 text-center">
              <span className="text-xs text-sky-200 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" /> Save 20+ hours of manual work every week
              </span>
            </div>
          </div>
        </div>
      );

    case "agentic-ai":
      return (
        <div className="relative w-full max-w-lg mx-auto bg-[#0e1630] border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">Autonomous Business AI</span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              Trained On Your Data
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[#131d3d] border border-slate-700/50 max-w-[85%] text-xs text-slate-200">
                What is your turnaround time for a custom client portal?
              </div>
            </div>

            <div className="flex items-start gap-2.5 justify-end">
              <div className="p-3 rounded-2xl rounded-tr-sm bg-[#172347] border border-[#0054a0]/50 max-w-[88%] text-xs text-slate-100">
                <p className="font-semibold text-sky-300 mb-1 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" /> Softech AI Agent
                </p>
                Typical turnaround is 3 to 4 weeks with weekly demo builds. Would you like to schedule a free 20-minute discovery call with our technical lead?
              </div>
              <div className="w-7 h-7 rounded-full bg-[#0054a0]/30 text-sky-300 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#131d3d] border border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
              <span>Response Latency</span>
              <span className="text-sky-300 font-semibold">0.4s · 100% Autonomous</span>
            </div>
          </div>
        </div>
      );

    case "ui-ux-design":
      return (
        <div className="relative w-full max-w-lg mx-auto bg-[#0e1630] border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Layout className="w-4 h-4 text-[#0054a0]" /> Figma Interactive Prototype
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              Tested UX Flow
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-xl bg-[#131d3d] border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Component Architecture</span>
                <span className="text-[11px] text-slate-400">Clean Design System</span>
              </div>
              <div className="h-16 rounded-lg bg-[#0e1630] border border-slate-700/60 flex items-center justify-around px-3 gap-3">
                <div className="w-1/2 h-8 rounded bg-[#0054a0] flex items-center justify-center text-[11px] text-white font-medium">
                  Primary Action
                </div>
                <div className="w-1/2 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] text-slate-300">
                  Input State
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 text-slate-300">
                <p className="text-[11px] text-slate-400 font-medium">Deliverable</p>
                <p className="font-semibold text-white mt-0.5">Clickable Prototype</p>
              </div>
              <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 text-slate-300">
                <p className="text-[11px] text-slate-400 font-medium">User Testing</p>
                <p className="font-semibold text-sky-300 mt-0.5">Zero Dev Rework</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "deployment-and-maintenance":
      return (
        <div className="relative w-full max-w-lg mx-auto bg-[#0e1630] border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#0054a0]" /> Cloud Cluster Health
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              All Systems Operational
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50">
                <p className="text-[11px] text-slate-400 font-medium">Uptime Guarantee</p>
                <p className="text-lg font-bold text-white mt-0.5">99.99%</p>
              </div>
              <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50">
                <p className="text-[11px] text-slate-400 font-medium">Global Latency</p>
                <p className="text-lg font-bold text-sky-300 mt-0.5">22ms</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0054a0]" /> SSL Security Shield
                </span>
                <span className="text-slate-300 font-mono text-[11px]">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0054a0]" /> Automated Daily Backups
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Synced</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const ServiceCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allCategories = getAllServiceCategories();
  const otherCategories = allCategories.filter((c) => c.slug !== category.slug);

  // SEO Schema.org: Service + FAQPage Structured Data for Google Rich Snippets
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": category.name,
        "description": category.shortDescription,
        "provider": {
          "@type": "Organization",
          "name": "SoftechSol",
          "url": DOMAIN_URL,
          "logo": `${DOMAIN_URL}/logo.svg`,
        },
        "url": `${DOMAIN_URL}/services/${category.slug}`,
        "areaServed": "Worldwide",
      },
      {
        "@type": "FAQPage",
        "mainEntity": category.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="main py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-primary transition-colors"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* 1. HERO SECTION (Theme Dark Blue with Trust Badges) */}
        <section className="relative mb-16 overflow-hidden rounded-3xl bg-[#0c1227] text-white p-8 md:p-12 lg:p-14 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0054a0]/15 text-sky-200 border border-[#0054a0]/30 text-xs font-semibold uppercase tracking-wider">
                SoftechSol Engineering Practice
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                {category.h1Title || category.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* 3 Trust Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {category.trustBadges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1630] border border-slate-700/60 text-slate-200 text-xs sm:text-sm font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>

              {/* Action CTAs */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#0054a0] hover:bg-[#004380] text-white font-semibold shadow-md shadow-[#0054a0]/30 transition-all duration-200"
                >
                  <Link href="/contact" aria-label={`Get started with ${category.name}`}>
                    Book a Free Discovery Call
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="bg-[#0e1630] hover:bg-slate-800 text-white border border-slate-700/80 font-medium transition-all"
                >
                  <a
                    href="https://wa.me/923062993712"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Hero Visual Slot: Custom Image or Fallback Graphic */}
            <div className="lg:col-span-5 flex items-center justify-center">
              {/* IMAGE SLOT: If customImageSrc is specified, render the image; otherwise show interactive theme fallback */}
              {category.customImageSrc ? (
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-[#0e1630] p-4 sm:p-6 flex items-center justify-center">
                  <Image
                    src={category.customImageSrc}
                    alt={category.image?.altText || category.name}
                    fill
                    className="object-contain object-center p-2 sm:p-4"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                  />
                </div>
              ) : (
                <ServicePageVisualFallback category={category} />
              )}
            </div>
          </div>
        </section>

        {/* 2. CHALLENGES WE SOLVE (Pain vs Solution Matrix) */}
        {category.painPoints && category.painPoints.length > 0 && (
          <section aria-labelledby="challenges-heading" className="mb-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Why Choose Us Over Generic Agencies
              </span>
              <h2
                id="challenges-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
              >
                Common Industry Headaches &amp; How We Protect Your Project
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Building custom software shouldn&apos;t mean blown budgets, missed deadlines, or unreturned phone calls. Here is how we guarantee a transparent, stress-free engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.painPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>The Common Problem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {item.problem}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>The SoftechSol Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-900 font-medium leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. CORE CAPABILITIES & DELIVERABLES (Numbered 01, 02, 03 Cards) */}
        <section aria-labelledby="services-heading" className="space-y-10 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Detailed Deliverables
              </span>
              <h2
                id="services-heading"
                className="text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                What Is Included in {category.name}
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
              {category.services.length} Specialized Deliverables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {category.services.map((service, index) => (
              <div
                key={service.id}
                className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-8 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0054a0]/10 text-primary font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                      Production Grade
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {service.description || service.shortDescription}
                  </p>

                  {/* Concrete Deliverables Checklist */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Tangible Deliverables:
                      </p>
                      <ul className="grid grid-cols-1 gap-2">
                        {service.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2 text-xs md:text-sm text-gray-700"
                          >
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Business Impact Note */}
                  {service.businessImpact && (
                    <div className="pt-3 border-t border-gray-100">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 flex items-start gap-2.5">
                        <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-900">Business Impact: </span>
                          <span>{service.businessImpact}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
                  >
                    Discuss this service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. HOW WE DELIVER (The 4-Step Process) */}
        {category.process && category.process.length > 0 && (
          <section aria-labelledby="process-heading" className="mb-20 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Transparent Execution
              </span>
              <h2
                id="process-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
              >
                Our 4-Step Delivery Process
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                You are never left in the dark. We work in structured sprints with weekly live demo builds and fixed milestone checkpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.process.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-[#0054a0] font-mono">
                        {step.step}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Milestone Output:
                    </p>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {step.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. PURPOSE-DRIVEN TECH STACK */}
        {category.techStack && category.techStack.length > 0 && (
          <section aria-labelledby="tech-heading" className="mb-20 space-y-8 bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Enterprise Standards
              </span>
              <h2
                id="tech-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900"
              >
                Modern Technology Stack &amp; Architecture
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                We select battle-tested, active open-source frameworks that protect your business from technical debt and scale seamlessly as your user base expands.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {category.techStack.map((stackGroup, gIdx) => (
                <div
                  key={gIdx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {stackGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stackGroup.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. REAL CLIENT FREQUENTLY ASKED QUESTIONS (Accordion) */}
        {category.faqs && category.faqs.length > 0 && (
          <section aria-labelledby="faqs-heading" className="mb-20 space-y-8 bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Got Questions?
              </span>
              <h2
                id="faqs-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900"
              >
                Frequently Asked Questions About {category.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
                Honest answers to the most common questions about pricing, timelines, source code ownership, and maintenance.
              </p>
            </div>

            <div className="pt-2">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {category.faqs.map((faq, fIdx) => (
                  <AccordionItem
                    key={fIdx}
                    value={`faq-${fIdx}`}
                    className="border border-gray-200 rounded-xl px-5 py-1 shadow-2xs data-[state=open]:border-primary/50 data-[state=open]:bg-slate-50/50"
                  >
                    <AccordionTrigger className="text-left font-bold text-gray-900 text-sm sm:text-base hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-xs sm:text-sm leading-relaxed pb-4 pt-1">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* 7. EXPLORE OTHER SERVICES (SEO Internal Linking) */}
        <section aria-labelledby="other-services-heading" className="mb-20 space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="other-services-heading" className="text-2xl font-bold text-gray-900">
              Explore Our Other Services
            </h2>
            <Link
              href="/services"
              className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
            >
              All Services <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center justify-between text-base">
                    {other.name}
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {other.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end text-xs">
                  <span className="text-primary font-semibold group-hover:underline inline-flex items-center gap-1.5">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 8. CLOSING HIGH-CONVERTING CTA BANNER */}
        <section className="rounded-3xl bg-[#0c1227] p-8 md:p-14 text-center text-white space-y-4 border border-slate-800">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Ready to Build Your {category.name} Project?
          </h2>
          <p className="mx-auto max-w-xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Book a free 20-minute consultation with our technical team. We will review your goals, provide honest architecture advice, and give you a fixed-timeline plan.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#0054a0] hover:bg-[#004380] text-white font-semibold shadow-md shadow-[#0054a0]/30 transition-all duration-200"
            >
              <Link href="/contact">
                Schedule a Discovery Call
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#0e1630] hover:bg-slate-800 text-white border border-slate-700/80 font-medium"
            >
              <a
                href="https://wa.me/923062993712"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            No sales pressure. Direct conversation with engineering leadership. Response guaranteed within 24 hours.
          </p>
        </section>
      </main>
    </>
  );
};

export default ServiceCategoryPage;
