import AboutStatsSection from "@/components/about-stats-section";
import AboutTeamSection from "@/components/about-team-section";
import DocumentIcon from "@/components/svgs/doc";
import LeavesIcon from "@/components/svgs/leaves";
import UserStarIcon from "@/components/svgs/userstar";
import { DOMAIN_URL } from "@/constants/url";
import { fetchTeams } from "@/lib/apis";
import logger from "@/lib/logger";
import { HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team at SoftechSol - real people building real software solutions. No corporate fluff, just honest work and results that matter. 500+ brands helped, 5+ years of experience, 98% client satisfaction.",
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
  logger.info(teams, "teams");
  return (
    <main className="bg-white">
      <header
        className="bg-cover bg-center   w-full"
        style={{ backgroundImage: "url('/about/about_hero.webp')" }}
      >
        <div className="md:py-[20dvh] py-[15dvh] text-center px-5 max-w-3xl mx-auto space-y-4">
          <h1>Empowering Smarter Tech-Decisions for a Secure Business</h1>
          <p className="text-lg text-muted-foreground">
            At Softechsol, we make digital transformation accessible. From
            custom software and AI automation to web development and marketing,
            we help businesses grow with clarity, precision, and technical
            expertise
          </p>
        </div>
      </header>
      <div className="main mt-0">
        {/* Who We Are Section */}
        <article className="mb-20">
          <section
            className="grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-6 py-[8dvh] items-center justify-center w-full"
            aria-labelledby="who-we-are"
          >
            <div>
              <h2
                id="who-we-are"
                className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
              >
                Who We Actually Are
              </h2>
              <p className="text-lg leading-relaxed mb-6 text-foreground/90">
                Let&apos;s be honest-we started SoftechSol because we were tired
                of seeing businesses get overcharged for software that
                doesn&apos;t work. Some of us spent years in big agencies
                watching clients pay six figures for websites that broke in a
                month. Others came from startups where we learned to build fast,
                but also learned what actually matters.
              </p>

              <p className="text-lg leading-relaxed mb-6 text-foreground/90">
                So we put together a small team of 7 people who actually care.
                No account managers who don&apos;t know code. No sales teams
                promising the moon. Just developers, designers, and strategists
                who talk to you directly and build things that actually work.
              </p>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/about/teambanner.webp"
                alt="About Us"
                width={500}
                className="rounded-xl shadow  place-self-center "
                height={500}
              />
            </div>
          </section>
          <div className=" col-span-full grid md:grid-cols-3 gap-5 grid-cols-1">
            {[
              {
                icon: <LeavesIcon className="size-9" />,
                bold: "Built for Growth",
                text: "Designed to scale with your needs, from startups to enterprises.",
              },
              {
                icon: <UserStarIcon className="size-9" />,
                bold: "Backed by Professionals",
                text: "A team of experts who understands your challenges",
              },
              {
                icon: <ShieldCheck className="size-9" />,
                bold: "Driven by Trust",
                text: "A team of experts who understands your challenges",
              },
            ].map((item) => (
              <div
                key={item.bold}
                className="bg-primary/5 shadow rounded-lg p-4 space-y-3"
              >
                <div>{item.icon}</div>
                <div className="text-lg">
                  <strong>{item.bold}</strong> -{" "}
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="">
          <h2 className="text-center mb-6">Our Core Values</h2>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            <div className="col-span-1 space-y-5">
              <div className="bg-primary/5 space-y-3 rounded-xl shadow p-5">
                <div className="bg-linear-to-r from-darkblue/30 to-primary/30 rounded-full p-3  w-fit ">
                  <DocumentIcon className="size-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Transparency</h3>
                <p className="text-lg text-muted-foreground">
                  Clear, honest, and straightforward communication.
                </p>
              </div>
              <div className="bg-primary/5 space-y-3 rounded-xl shadow p-5">
                <div className="bg-linear-to-r from-darkblue/30 to-primary/30 rounded-full p-3  w-fit ">
                  <Lightbulb className="size-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Innovation</h3>
                <p className="text-lg text-muted-foreground">
                  Constantly improving with technology that works for you.
                </p>
              </div>
            </div>
            <div className="col-span-1 h-[444px] w-full relative">
              <Image
                src="/about/aboutgrid.webp"
                fill
                alt="Core Values"
                className="rounded-xl shadow h-full w-full object-center object-cover"
              />
            </div>
            <div className="col-span-1 space-y-5">
              <div className="bg-primary/5 space-y-3 rounded-xl shadow p-5">
                <div className="bg-linear-to-r from-darkblue/30 to-primary/30 rounded-full p-3  w-fit ">
                  <ShieldCheck className="size-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Security</h3>
                <p className="text-lg text-muted-foreground">
                  Your business data is encrypted and protected 24/7.
                </p>
              </div>
              <div className="bg-primary/5 space-y-3 rounded-xl shadow p-5">
                <div className="bg-linear-to-r from-darkblue/30 to-primary/30 rounded-full p-3  w-fit ">
                  <HeartHandshake className="size-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Customer First</h3>
                <p className="text-lg text-muted-foreground">
                  Our professionals build every feature with your needs in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <AboutStatsSection />

        {/* Mission Section */}
        {/* <article className="mb-20 mt-20">
          <section
            className="prose prose-lg max-w-none neditor-html"
            aria-labelledby="our-mission"
          >
            <header className="mb-8">
              <h2
                id="our-mission"
                className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              >
                What We&apos;re Trying to Do Here
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
                Good Software Shouldn&apos;t Cost a Fortune
              </h3>
            </header>

            <p className="text-lg leading-relaxed mb-8 text-foreground/90">
              Look, we&apos;ve all been there. You need a website or an app, and
              the quotes you get are either way too expensive or way too cheap
              (and you know the cheap ones will break). We think there&apos;s a
              middle ground: solid software that works, doesn&apos;t cost an arm
              and a leg, and you can actually understand what you&apos;re paying
              for.
            </p>

            <p className="text-lg leading-relaxed mb-8 text-foreground/90">
              That&apos;s what we build-web apps, mobile apps, business systems
              that actually help you run your business better. Not the flashiest
              thing in the world, but reliable, affordable, and built to last.
            </p>
          </section>
        </article> */}

        {/* Values Section */}
        {/* <AboutValuesSection data={data} /> */}

        {/* Team Section */}
        <AboutTeamSection teams={teams} />
      </div>{" "}
    </main>
  );
};

export default About;
