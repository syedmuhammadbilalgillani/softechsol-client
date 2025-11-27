import AboutHeroSection from "@/components/about-hero-section";
import AboutStatsSection from "@/components/about-stats-section";
import AboutTeamSection from "@/components/about-team-section";
import AboutValuesSection from "@/components/about-values-section";
import Heading from "@/components/heading";
import { data } from "@/constants/data";
import { DOMAIN_URL } from "@/constants/url";
import { fetchTeams } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SoftechSol - a team of passionate designers, strategists, and innovators committed to transforming ideas into compelling digital experiences. 500+ brands crafted, 5+ years of experience, 98% client satisfaction rate.",
  openGraph: {
    title: "About Us | SoftechSol",
    description:
      "Learn about SoftechSol - a team of passionate designers, strategists, and innovators committed to transforming ideas into compelling digital experiences.",
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
      "Learn about SoftechSol - a team of passionate designers, strategists, and innovators committed to transforming ideas into compelling digital experiences.",
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
  logger.info(teams, "teams");
  return (
    <main className="main py-10">
      <Heading as="h1" title="About Us" />
      <h2 className="text-4xl font-bold pb-5">Designing Impact With Intent</h2>

      <AboutHeroSection />

      <AboutStatsSection />

      <AboutValuesSection data={data} />

      <AboutTeamSection teams={teams} />
    </main>
  );
};

export default About;
