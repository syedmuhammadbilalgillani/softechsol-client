import AboutBanner from "@/components/about-banner";
import HeroSection from "@/components/hero-section";
import ClientTrustStrip from "@/components/client-trust-strip";
import HomeCtaBanner from "@/components/home-cta-banner";
import { DOMAIN_URL } from "@/constants/url";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "@/components/spinner";

// Lazy load below-the-fold components
const ServicesSection = dynamic(() => import("@/components/services-section"), {
  loading: () => <Spinner />,
});
const ProjectSection = dynamic(() => import("@/components/project-section"), {
  loading: () => <Spinner />,
});
const BenifitsBanner = dynamic(() => import("@/components/benifits-banner"), {
  loading: () => <Spinner />,
});
const TestimonialSection = dynamic(
  () => import("@/components/testimonial-section"),
  {
    loading: () => <Spinner />,
  }
);
const FaqsSection = dynamic(() => import("@/components/faqs-section"), {
  loading: () => <Spinner />,
});

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Home",
  description:
    "SoftechSol - Leading software development company. We provide innovative software solutions, web development, mobile apps, and digital transformation services. Transform your business with our expert team.",
  openGraph: {
    title: "SoftechSol - Software Development Company",
    description:
      "Leading software development company providing innovative software solutions, web development, mobile apps, and digital transformation services.",
    url: DOMAIN_URL,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/home_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "SoftechSol - Software Development Company",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftechSol - Software Development Company",
    description:
      "Leading software development company providing innovative software solutions and digital transformation services.",
    images: [`${DOMAIN_URL}/home_hero.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const Home = () => {
  
  return (
    <>
      <h1 className="text-[1px] text-transparent absolute top-0 left-0">
        Softechsol
      </h1>
      <Suspense>
        {/* 1. Hero 6-Service Slider */}
        <HeroSection />

        {/* 2. Client Trust Strip (Premier Salt, US Civilgenix, GCE) */}
        <ClientTrustStrip />

        {/* 3. About Us (Anti-Fluff Manifesto) */}
        <AboutBanner />

        {/* 4. Services Overview (The 6 Core Pillars) */}
        <ServicesSection />

        {/* 5. Recent Projects (Proof of Work) */}
        <ProjectSection />

        {/* 6. Benefits & Stats (Turnaround & 98% Satisfaction) */}
        <BenifitsBanner />

        {/* 7. Our Promise / Values Slider */}
        <TestimonialSection />

        {/* 8. Frequently Asked Questions */}
        <FaqsSection />

        {/* 9. High-Impact Closing CTA Banner */}
        <HomeCtaBanner />
      </Suspense>
    </>
  );
};

export default Home;
