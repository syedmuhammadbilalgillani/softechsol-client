"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  Smartphone,
  Workflow,
  Bot,
  Palette,
  Server,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Search,
  Sliders,
  Clock,
  Lock,
  Layout,
  Users,
  TrendingUp,
  Check,
  Star,
  User,
  Activity,
  Layers,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

interface HighlightItem {
  label: string;
  icon: React.ElementType;
}

interface HeroSlide {
  id: string;
  slug: string;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  highlightedWord: string;
  description: string;
  highlights: HighlightItem[];
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageSrc?: string; // Add your custom image path here when ready
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "web-development",
    slug: "web-development",
    badge: "Custom Web Solutions",
    badgeIcon: Globe,
    title: "Websites That Turn Visitors Into",
    highlightedWord: "Paying Clients",
    description:
      "We design and engineer lightning-fast business websites, custom web applications, and customer portals tailored to your exact workflow. Mobile-first, secure, and SEO-optimized from day one.",
    highlights: [
      { label: "Sub-2s Load Speed", icon: Zap },
      { label: "100% Mobile Ready", icon: Smartphone },
      { label: "Google SEO Optimized", icon: Search },
    ],
    primaryCtaText: "Explore Web Services",
    primaryCtaHref: "/services/web-development",
    secondaryCtaText: "Get a Free Quote",
    secondaryCtaHref: "/contact",
    imageSrc: "/services/Web_Development_Services.webp",
  },
  {
    id: "mobile-development",
    slug: "mobile-development",
    badge: "Mobile App Development",
    badgeIcon: Smartphone,
    title: "High-Performance iOS & Android Apps",
    highlightedWord: "Users Love",
    description:
      "Turn your business vision into an intuitive, high-speed mobile application. We build cross-platform apps for App Store & Google Play with smooth interactions and rock-solid reliability.",
    highlights: [
      { label: "iOS & Android Support", icon: Smartphone },
      { label: "App Store Ready", icon: CheckCircle2 },
      { label: "Native Performance Feel", icon: Sliders },
    ],
    primaryCtaText: "Explore Mobile Apps",
    primaryCtaHref: "/services/mobile-development",
    secondaryCtaText: "Discuss Your App Idea",
    secondaryCtaHref: "/contact",
    imageSrc: "/services/Mobile_App_Development_Showcase.webp",
  },
  {
    id: "business-automation",
    slug: "business-automation",
    badge: "Workflow Automation",
    badgeIcon: Workflow,
    title: "Automate Daily Busywork & Run On",
    highlightedWord: "Autopilot",
    description:
      "Stop wasting valuable team hours on repetitive manual data entry. We connect your CRM, accounting software, WhatsApp, and email workflows so your business runs 10x faster without errors.",
    highlights: [
      { label: "Save 20+ Hours Weekly", icon: Clock },
      { label: "Zero Human Errors", icon: ShieldCheck },
      { label: "Seamless Tool Integration", icon: Workflow },
    ],
    primaryCtaText: "Explore Automation",
    primaryCtaHref: "/services/business-automation",
    secondaryCtaText: "Automate Your Workflow",
    secondaryCtaHref: "/contact",
    imageSrc: "/services/Business_Workflow_Automation_Dashboard.webp",
  },
  {
    id: "agentic-ai",
    slug: "agentic-ai",
    badge: "Agentic AI & Custom Chatbots",
    badgeIcon: Bot,
    title: "Smart Autonomous AI Agents That Work",
    highlightedWord: "24/7 For You",
    description:
      "Deploy custom AI agents trained exclusively on your business data. They qualify incoming customer leads, resolve support inquiries instantly, and summarize complex business tasks with zero downtime.",
    highlights: [
      { label: "24/7 Autonomous Support", icon: Bot },
      { label: "Trained on Business Data", icon: Server },
      { label: "Instant Query Resolutions", icon: Zap },
    ],
    primaryCtaText: "Explore AI Services",
    primaryCtaHref: "/services/agentic-ai",
    secondaryCtaText: "Build Custom AI",
    secondaryCtaHref: "/contact",
    imageSrc: "/services/AI_Agent_Ecosystem_Dashboard.webp",
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    badge: "UI/UX & Product Design",
    badgeIcon: Palette,
    title: "Intuitive Designs That Drive Higher",
    highlightedWord: "Conversions",
    description:
      "We design clean, conversion-focused user interfaces and interactive click-through prototypes in Figma before writing code. Test and validate your product experience with real users risk-free.",
    highlights: [
      { label: "Clickable Prototypes", icon: Layout },
      { label: "User-Centric Journeys", icon: Users },
      { label: "Higher Conversion Rates", icon: TrendingUp },
    ],
    primaryCtaText: "Explore UI/UX Design",
    primaryCtaHref: "/services/ui-ux-design",
    secondaryCtaText: "Request Design Review",
    secondaryCtaHref: "/contact",
    imageSrc: "/services/UI_UX_Design_Prototyping_Workspace.webp",
  },
  {
    id: "deployment-and-maintenance",
    slug: "deployment-and-maintenance",
    badge: "Cloud & DevOps Support",
    badgeIcon: Server,
    title: "Rock-Solid Cloud Hosting, Speed &",
    highlightedWord: "24/7 Security",
    description:
      "Keep your digital applications protected, lightning-fast, and always online. We handle cloud architecture, SSL setup, automated daily backups, security patching, and proactive 24/7 monitoring.",
    highlights: [
      { label: "99.9% Uptime Guarantee", icon: ShieldCheck },
      { label: "Automated Daily Backups", icon: Server },
      { label: "Proactive Security Shield", icon: Lock },
    ],
    primaryCtaText: "Explore Cloud Support",
    primaryCtaHref: "/services/deployment-and-maintenance",
    secondaryCtaText: "Get Infrastructure Help",
    secondaryCtaHref: "/contact",
    imageSrc: "/services/Cloud_DevOps_Dashboard_Workspace.webp",
  },
];

const AUTOPLAY_INTERVAL = 3000; // 3 seconds per slide

// Clean, professional theme-colored fallback visuals (No emojis, no shocking gradients)
const ServiceFallbackVisual = ({ slide }: { slide: HeroSlide }) => {
  switch (slide.id) {
    case "web-development":
      return (
        <div className="relative w-full max-w-lg mx-auto bg-[#0e1630] border border-slate-700/60 rounded-2xl p-5 shadow-2xl">
          {/* Browser Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            </div>
            <div className="px-3 py-1 rounded-full bg-[#131d3d] text-xs text-slate-300 font-mono flex items-center gap-1.5 border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              softechsol.com/preview
            </div>
            <ShieldCheck className="w-4 h-4 text-slate-400" />
          </div>

          {/* Browser Content */}
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-[#131d3d] border border-slate-700/50 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                  Live Application
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/40 font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm font-semibold text-white">Custom Web Portal</p>
              <p className="text-xs text-slate-300 mt-1">High-speed business dashboard and user system</p>
            </div>

            {/* Metric Cards Grid */}
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
                  <p className="text-[11px] text-slate-400 font-medium">Conversion Lift</p>
                  <p className="text-sm font-bold text-white">+180% Avg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "mobile-development":
      return (
        <div className="relative w-full max-w-sm mx-auto bg-[#0e1630] border-2 border-slate-700/70 rounded-[2.5rem] p-4 shadow-2xl">
          {/* Phone Speaker Notch */}
          <div className="flex justify-center mb-3">
            <div className="w-20 h-3.5 rounded-full bg-slate-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
          </div>

          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>9:41</span>
              <span className="text-slate-300 font-medium">5G Full</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#131d3d] border border-slate-700/50">
              <p className="text-xs text-slate-400 font-medium">Mobile Application</p>
              <h4 className="text-base font-bold text-white mt-1">Cross-Platform Build</h4>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                <span>Compatibility</span>
                <span className="font-semibold text-sky-300">iOS & Android</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#0054a0]/20 text-sky-300 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">App Store & Play Store</p>
                <p className="text-slate-400 text-[11px]">Production Deployment Ready</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#131d3d] border border-slate-700/40 flex items-center justify-between text-xs text-slate-300">
              <span>Client Review Score</span>
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
              <Workflow className="w-4 h-4 text-[#0054a0]" /> Automated Pipeline
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              Active Sync
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="p-3 rounded-xl bg-[#131d3d] border border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-[#0054a0]/20 text-sky-300 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Inquiry Form Submission</p>
                  <p className="text-[11px] text-slate-400">Trigger event captured instantly</p>
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
                  <p className="text-xs font-semibold text-white">CRM & Team Notification</p>
                  <p className="text-[11px] text-slate-400">Database updated and team alerted</p>
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
                  <p className="text-xs font-semibold text-white">Automated Client Confirmation</p>
                  <p className="text-[11px] text-slate-400">Email & proposal delivered seamlessly</p>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">Done</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0054a0]/15 border border-[#0054a0]/30 text-center">
              <span className="text-xs text-sky-200 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" /> Save 20+ hours of manual data entry every week
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
              <span className="text-xs font-semibold text-slate-200">Custom AI Assistant</span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              Trained on Company Docs
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[#131d3d] border border-slate-700/50 max-w-[85%] text-xs text-slate-200">
                Can you summarize our client contracts and prepare next month&apos;s invoice report?
              </div>
            </div>

            <div className="flex items-start gap-2.5 justify-end">
              <div className="p-3 rounded-2xl rounded-tr-sm bg-[#172347] border border-[#0054a0]/50 max-w-[88%] text-xs text-slate-100">
                <p className="font-semibold text-sky-300 mb-1 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" /> Softech AI Agent
                </p>
                Done! All 14 active client agreements summarized and invoices generated with full line-item accuracy.
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
              <Layout className="w-4 h-4 text-[#0054a0]" /> Design System & Wireframes
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/30 font-medium">
              Figma Ready
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-xl bg-[#131d3d] border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Component Architecture</span>
                <span className="text-[11px] text-slate-400">High-Fidelity</span>
              </div>
              <div className="h-16 rounded-lg bg-[#0e1630] border border-slate-700/60 flex items-center justify-around px-3 gap-3">
                <div className="w-1/2 h-8 rounded bg-[#0054a0] flex items-center justify-center text-[11px] text-white font-medium">
                  Primary Action
                </div>
                <div className="w-1/2 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] text-slate-300">
                  Form Field
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
              Online
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

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = HERO_SLIDES[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const handleSelectSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 25 : -25,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -25 : 25,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <header
      className="relative w-full bg-[#0c1227] overflow-hidden min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between"
      role="banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle brand blue background illumination (No shocking gradients) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0054a0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#0054a0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slider Content Area */}
      <div className="container mx-auto relative z-10 px-6 md:px-10 pt-24 pb-12 flex-1 flex items-center">
        <div className="w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* LEFT COLUMN: Service Details & CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                {/* Category Badge - Clean corporate brand styling */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0054a0]/30 bg-[#0054a0]/15 text-sky-200 text-xs sm:text-sm font-medium w-fit mb-4">
                  <BadgeIcon className="w-4 h-4 text-sky-300" />
                  <span>{activeSlide.badge}</span>
                </div>

                {/* Main Heading - Clean solid typography */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {activeSlide.title}{" "}
                  <span className="text-sky-400">
                    {activeSlide.highlightedWord}
                  </span>
                </h1>

                {/* Subtext Description */}
                <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {activeSlide.description}
                </p>

                {/* Action CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#0054a0] hover:bg-[#004380] text-white font-semibold shadow-md shadow-[#0054a0]/30 transition-all duration-200"
                  >
                    <Link href={activeSlide.primaryCtaHref} className="flex items-center gap-2">
                      {activeSlide.primaryCtaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="bg-[#0e1630] hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 font-medium transition-all duration-200 shadow-sm"
                  >
                    <Link href={activeSlide.secondaryCtaHref}>
                      {activeSlide.secondaryCtaText}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN: Visual Graphic (Custom Image or Fallback) */}
              <div className="lg:col-span-5 flex items-center justify-center">
                {activeSlide.imageSrc ? (
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                    <Image
                      src={activeSlide.imageSrc}
                      alt={activeSlide.title}
                      fill
                      priority
                      className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                ) : (
                  <ServiceFallbackVisual slide={activeSlide} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM NAVIGATION: Minimal Indicators & Arrow Controls */}
      <div className="relative z-20 border-t border-slate-800 bg-[#090d1c] py-3.5">
        <div className="container mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
          {/* Minimal Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 bg-[#0054a0]"
                      : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

          {/* Previous / Next Arrows & Status */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400 font-mono">
              0{currentIndex + 1} / 0{HERO_SLIDES.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-[#0e1630] hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 cursor-pointer"
                aria-label="Previous service slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-[#0e1630] hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 cursor-pointer"
                aria-label="Next service slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
