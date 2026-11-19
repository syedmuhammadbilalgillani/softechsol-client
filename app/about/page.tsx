import AboutStatsSection from "@/components/about-stats-section";
import AboutTeamSection from "@/components/about-team-section";
import ClientTrustStrip from "@/components/client-trust-strip";
import Heading from "@/components/heading";
import HomeCtaBanner from "@/components/home-cta-banner";
import { DOMAIN_URL } from "@/constants/url";
import { fetchTeams } from "@/lib/apis";
import {
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us | SoftechSol",
  description:
    "Meet the team at SoftechSol - real people building real software solutions. No corporate fluff, just honest work and results that matter. 50+ projects delivered, 7+ years of experience, 98% client satisfaction.",
  openGraph: {
    title: "About Us | SoftechSol",
    description:
      "Real people building real software solutions. No corporate fluff, just honest work and results that matter.",
    url: `${DOMAIN_URL}/about`,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/abouthero.jpg`,
        width: 1200,
        height: 630,
        alt: "About SoftechSol",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | SoftechSol",
    description:
      "Real people building real software solutions. No corporate fluff, just honest work and results that matter.",
    images: [`${DOMAIN_URL}/abouthero.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/about",
  },
};

const About = async () => {
  const teams = await fetchTeams();

  return (
    <main className="bg-white">
      {/* 1. HERO HEADER WITH PATTERN SVG BACKGROUND */}
      <header className="relative bg-[#0c1227] text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800">
        {/* Ambient brand glow in the center so pattern lights up */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#0054a0]/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Standout Pattern background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 h-full w-full text-sky-400/35"
            aria-hidden="true"
          >
            <pattern
              id="hero-pattern"
              patternUnits="userSpaceOnUse"
              width="52"
              height="90"
              patternTransform="scale(0.85)"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                d="m0,15 26-15 26,15v30l-26,15-26-15zM26,60v30"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
          {/* Subtle bottom fade to blend smoothly */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1227]/30 via-transparent to-[#0c1227]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl space-y-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0054a0]/20 text-sky-200 border border-[#0054a0]/40 text-xs font-semibold uppercase tracking-wider">
            About SoftechSol
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Engineers &amp; Builders Creating Software That{" "}
            <span className="text-sky-400">Drives Real Business Growth</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We partner directly with ambitious businesses and founders to engineer
            high-speed web platforms, mobile apps, and automated workflows —
            with zero agency fluff, transparent milestone pricing, and 100% code ownership.
          </p>
        </div>
      </header>

      {/* 2. REAL CLIENT TRUST STRIP */}
      <ClientTrustStrip />

      <div className="main mt-0">
        {/* 3. WHO WE ACTUALLY ARE SECTION */}
        <article className="py-12 md:py-16">
          <section
            className="grid lg:grid-cols-2 grid-cols-1 md:gap-12 gap-8 items-center justify-center w-full"
            aria-labelledby="who-we-are"
          >
            <div className="space-y-4">
              <Heading title="Our Origin Story" />
              <h2
                id="who-we-are"
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              >
                Who We Actually Are
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600">
                Let&apos;s be honest — we started SoftechSol because we were tired
                of seeing businesses get overcharged for software that
                doesn&apos;t work. Some of us spent years in big agencies
                watching clients pay six figures for websites that broke in a
                month. Others came from high-growth startups where we learned to build fast,
                deliver lean, and focus on what actually moves the needle.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-gray-600">
                So we put together a dedicated team of engineers and designers who actually care.
                No account managers playing telephone. No sales reps making impossible promises.
                Just technical leads and designers who talk to you directly and build software
                that works reliably from Day 1.
              </p>
            </div>

            <div className="relative w-full aspect-square max-w-[480px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <Image
                src="/about/teambanner.webp"
                alt="SoftechSol team members collaborate on engineering solutions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </section>

          {/* 3 Value Pillars */}
          <div className="mt-10 grid md:grid-cols-3 gap-6 grid-cols-1">
            {[
              {
                icon: <TrendingUp className="w-6 h-6 text-primary" />,
                bold: "Built for Scalability",
                text: "Engineered from day one to handle high traffic and scale with your business without costly rewrites.",
              },
              {
                icon: <Users className="w-6 h-6 text-primary" />,
                bold: "Direct Technical Access",
                text: "Speak directly with the senior engineers and designers building your product — not non-technical middlemen.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-primary" />,
                bold: "100% Code & Asset Ownership",
                text: "Every line of code, design file, and server credential belongs entirely to you upon completion. Zero vendor lock-in.",
              },
            ].map((item) => (
              <div
                key={item.bold}
                className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs hover:border-primary/40 hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-base">
                  <strong className="text-gray-900 block mb-1 text-lg">
                    {item.bold}
                  </strong>
                  <span className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* 4. CORE VALUES SECTION */}
        <section aria-labelledby="core-values-heading" className="py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Heading title="Our Core Values" className="justify-center" />
            <h2
              id="core-values-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Built on Trust &amp; Engineering Discipline
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              How we work, collaborate, and deliver lasting value on every engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 items-center">
            {/* Left 2 Values */}
            <div className="col-span-1 space-y-6">
              <div className="bg-slate-50/80 border border-slate-200/90 space-y-3 rounded-2xl shadow-xs p-6 hover:border-primary/40 hover:bg-white transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Transparency</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Clear, honest communication at every 2-week sprint checkpoint. Weekly live demo builds and zero surprise invoices.
                </p>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/90 space-y-3 rounded-2xl shadow-xs p-6 hover:border-primary/40 hover:bg-white transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Engineering Excellence</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Modern, battle-tested technologies that keep your digital products fast, secure, and easily maintainable.
                </p>
              </div>
            </div>

            {/* Center Image */}
            <div className="col-span-1 h-[420px] w-full relative rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <Image
                src="/about/aboutgrid.webp"
                fill
                alt="SoftechSol engineering and teamwork values"
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            {/* Right 2 Values */}
            <div className="col-span-1 space-y-6">
              <div className="bg-slate-50/80 border border-slate-200/90 space-y-3 rounded-2xl shadow-xs p-6 hover:border-primary/40 hover:bg-white transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Security &amp; Privacy</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Enterprise-grade data encryption, automated daily backups, and strict privacy protection around the clock.
                </p>
              </div>

              <div className="bg-slate-50/80 border border-slate-200/90 space-y-3 rounded-2xl shadow-xs p-6 hover:border-primary/40 hover:bg-white transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Long-Term Partnership</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  We measure success by your business outcomes and long-term uptime, backed by our 30-day post-launch warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. STATS SECTION */}
        <AboutStatsSection />

        {/* 6. TEAM SECTION */}
        {teams && teams.length > 0 && <AboutTeamSection teams={teams} />}
      </div>

      {/* 7. CLOSING CTA BANNER */}
      <HomeCtaBanner />
    </main>
  );
};

export default About;
