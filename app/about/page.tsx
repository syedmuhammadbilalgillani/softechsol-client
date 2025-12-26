import AboutHeroSection from "@/components/about-hero-section";
import AboutStatsSection from "@/components/about-stats-section";
import AboutTeamSection from "@/components/about-team-section";
import AboutValuesSection from "@/components/about-values-section";
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
      <h1 className="text-5xl font-bold pb-5 text-center">About Softech Sol</h1>
      <h2>Who We Are: The Bridge Between Vision & Reality </h2>
      <p>
        At Softech Sol, we’re more than just a software company—we’re your
        dedicated technology partner. Founded by professionals who understand
        both the technical and business sides of digital solutions, we’ve built
        a team where strategic experience meets youthful innovation.
      </p>
      <p className="text-center text-lg pb-5">
        At Provision, we offer a full spectrum of creative and digital services
        designed to help brands grow, connect, and thrive. From crafting
        distinctive brand identities to developing seamless digital experiences,
        our approach combines strategy, design, and innovation to deliver
        meaningful results.
        <br />
        <br />
        Our expertise spans branding, product design, digital marketing, and
        website development ensuring your brand stands out across every
        platform. We don’t just create visuals; we build strategies that inspire
        trust, engage audiences, and drive measurable success.
      </p>

      <AboutHeroSection />

      <AboutStatsSection />

      <AboutValuesSection data={data} />

      <AboutTeamSection teams={teams} />
    </main>
  );
};

export default About;
