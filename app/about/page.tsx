import Heading from "@/components/heading";
import ImageWrapper from "@/components/image-wrapper";
import TeamCard from "@/components/team-card";
import { fetchTeams } from "@/lib/apis";
import logger from "@/lib/logger";
import { data } from "@/constants/data";
import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";
import { GalleryItem, Team } from "../generated/prisma";

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

      <section
        aria-labelledby="about-hero"
        className="relative md:h-[600px] md:min-h-[600px] md:max-h-[600px] h-[300px] min-h-[300px] max-h-[300px]"
      >
        <ImageWrapper
          src="/abouthero.jpg"
          alt="About Hero"
          className="object-cover rounded-xl h-full w-full"
          quality={100}
        />
      </section>

      <section className="main grid md:grid-cols-2 grid-cols-1 place-items-center py-10 md:gap-[10%] gap-5">
        <div className="flex gap-6">
          <div>
            <div className="text-3xl font-semibold mb-1">500+</div>
            <div>Brands Crafted</div>
          </div>
          <div>
            <div className="text-3xl font-semibold mb-1">5+</div>
            <div>Years of Experience</div>
          </div>
          <div>
            <div className="text-3xl font-semibold mb-1">98%</div>
            <div>Client Satisfaction Rate</div>
          </div>
        </div>
        <p className="text-xl">
          We are a team of passionate designers, strategists, and innovators
          committed to transforming ideas into compelling digital experiences.
          Creativity drives us, results define us.
        </p>
      </section>

      <section aria-labelledby="core-values">
        <Heading as="h2" title="Our Values" />
        <div className="grid md:grid-cols-2 grid-cols-1">
          {data.map((item, index) => (
            <article
              key={index}
              className={` md:p-10 py-10  max-md:border-b ${
                index % 2 === 0 ? "md:border-r-2 " : ""
              } ${index >= 2 ? "md:border-t-2 " : ""}`}
            >
              <h3 className="text-2xl font-bold">{item.label}</h3>
              <p className="text-lg">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="space-y-5 py-10">
        <Heading title="The Team" className="md:col-span-1 col-span-5" />
        <div className="md:col-span-4 col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {teams.map(
            (
              team: Team & { featured_image: GalleryItem | null | undefined },
              index
            ) => (
              <TeamCard
                key={index}
                data={{
                  ...team,
                  featured_image: team.featured_image as GalleryItem,
                }}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default About;
