import AboutBanner from "@/components/about-banner";
import HeroSection from "@/components/hero-section";
import { DOMAIN_URL } from "@/constants/url";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load below-the-fold components
const BenifitsBanner = dynamic(() => import("@/components/benifits-banner"), {
  loading: () => <div className="main py-10">Loading...</div>,
});
const ProjectSection = dynamic(() => import("@/components/project-section"), {
  loading: () => <div className="main py-10">Loading...</div>,
});
const ServicesSection = dynamic(() => import("@/components/services-section"), {
  loading: () => <div className="main py-10">Loading...</div>,
});
const TestimonialSection = dynamic(
  () => import("@/components/testimonial-section"),
  {
    loading: () => <div className="main py-10">Loading...</div>,
  }
);
const FaqsSection = dynamic(() => import("@/components/faqs-section"), {
  loading: () => <div className="main py-10">Loading...</div>,
});

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
        <HeroSection />
        <AboutBanner />
        <BenifitsBanner />
        <ProjectSection />
        <ServicesSection />
        <TestimonialSection />
        <FaqsSection />
      </Suspense>
    </>
  );
};

export default Home;
