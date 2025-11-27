import { DOMAIN_URL } from "@/constants/url";
import { fetchPodcasts } from "@/lib/apis";
import { Metadata } from "next";
import LearnWithUsPage from "@/components/learn-with-us-page";

export const metadata: Metadata = {
  title: "Learn With Us",
  description:
    "Discover our comprehensive learning resources, podcasts, and educational content. Learn cutting-edge technologies including React, Next.js, Express, Vue.js, Django, Nest.js, MongoDB, Tailwind CSS, and more. Join our community and enhance your skills with SoftechSol.",
  keywords: [
    "learn programming",
    "software development courses",
    "web development tutorials",
    "podcast",
    "educational content",
    "React",
    "Next.js",
    "Express.js",
    "Vue.js",
    "Django",
    "programming resources",
  ],
  openGraph: {
    title: "Learn With Us | SoftechSol",
    description:
      "Discover our comprehensive learning resources, podcasts, and educational content. Learn cutting-edge technologies and enhance your skills.",
    url: `${DOMAIN_URL}/learn-with-us`,
    siteName: "SoftechSol",
    images: [
      {
        url: `${DOMAIN_URL}/home_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Learn With Us - SoftechSol",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn With Us | SoftechSol",
    description:
      "Discover our comprehensive learning resources, podcasts, and educational content.",
    images: [`${DOMAIN_URL}/home_hero.jpg`],
    creator: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${DOMAIN_URL}/learn-with-us`,
  },
};

const LearnWithUs = async () => {
  const podcasts = await fetchPodcasts();

  return <LearnWithUsPage podcasts={podcasts || []} />;
};

export default LearnWithUs;
