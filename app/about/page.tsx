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
    <main className="main py-10">
      {/* Hero Header Section */}
      <header className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
          Hey, We&apos;re Softech Sol
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Real people building real solutions. No fluff, just results.
        </p>
      </header>

      {/* Who We Are Section */}
      <article className="mb-20">
        <section 
          className="prose prose-lg max-w-none neditor-html"
          aria-labelledby="who-we-are"
        >
          <h2 id="who-we-are" className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Who We Actually Are
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            Let&apos;s be honest—we started Softech Sol because we were tired of seeing businesses get 
            overcharged for software that doesn&apos;t work. Some of us spent years in big agencies watching 
            clients pay six figures for websites that broke in a month. Others came from startups where 
            we learned to build fast, but also learned what actually matters.
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-foreground/90">
            So we put together a small team of 7 people who actually care. No account managers who 
            don&apos;t know code. No sales teams promising the moon. Just developers, designers, and 
            strategists who talk to you directly and build things that actually work.
          </p>
          
          <div className="bg-muted/50 rounded-lg p-6 md:p-8 mb-8 border border-border">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
              What Makes Us Different (And Why That Matters)
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-6 text-foreground/90">
              Here&apos;s the thing: we&apos;ve got folks with 7+ years of experience who&apos;ve seen what works 
              (and what doesn&apos;t) in the real world. We also have developers who know the latest tools 
              because they&apos;re actually using them every day. That combination means you get:
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1" aria-hidden="true">✓</span>
                <span className="text-base md:text-lg text-foreground/90">
                  <strong className="text-foreground">Strategies that actually work</strong>—not theory, but stuff 
                  we&apos;ve seen move the needle for real businesses
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1" aria-hidden="true">✓</span>
                <span className="text-base md:text-lg text-foreground/90">
                  <strong className="text-foreground">Modern tech that won&apos;t break</strong>—we use tools 
                  that are current, but also stable enough to last
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1" aria-hidden="true">✓</span>
                <span className="text-base md:text-lg text-foreground/90">
                  <strong className="text-foreground">You talk to the people building it</strong>—no middlemen, 
                  no &quot;let me check with the team&quot; delays
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl mt-1" aria-hidden="true">✓</span>
                <span className="text-base md:text-lg text-foreground/90">
                  <strong className="text-foreground">Honest pricing</strong>—we tell you what things cost 
                  upfront, and if something&apos;s going to be expensive, we&apos;ll tell you why
                </span>
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed text-foreground/90">
            We intentionally keep our team small. That means we can&apos;t take on 50 projects at once, 
            but it also means the projects we do take on get our full attention. We&apos;d rather do 
            fewer things really well than spread ourselves thin.
          </p>
        </section>
      </article>

      {/* Hero Image Section */}
      <AboutHeroSection />

      {/* Stats Section */}
      <AboutStatsSection />

      {/* Mission Section */}
      <article className="mb-20 mt-20">
        <section 
          className="prose prose-lg max-w-none neditor-html"
          aria-labelledby="our-mission"
        >
          <header className="mb-8">
            <h2 id="our-mission" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What We&apos;re Trying to Do Here
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              Good Software Shouldn&apos;t Cost a Fortune
            </h3>
          </header>
          
          <p className="text-lg leading-relaxed mb-8 text-foreground/90">
            Look, we&apos;ve all been there. You need a website or an app, and the quotes you get are 
            either way too expensive or way too cheap (and you know the cheap ones will break). 
            We think there&apos;s a middle ground: solid software that works, doesn&apos;t cost an arm 
            and a leg, and you can actually understand what you&apos;re paying for.
          </p>

          <p className="text-lg leading-relaxed mb-8 text-foreground/90">
            That&apos;s what we build—web apps, mobile apps, business systems that actually help you 
            run your business better. Not the flashiest thing in the world, but reliable, affordable, 
            and built to last.
          </p>

          <div className="mb-6">
            <h4 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
              How we make that happen:
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="text-primary text-2xl font-bold" aria-hidden="true">1.</span>
                We Speak Plain English
              </h4>
              <p className="text-base leading-relaxed text-foreground/90">
                No jargon, no buzzwords. If we&apos;re building something, we&apos;ll explain what it does 
                and why it matters in terms you can actually understand. You shouldn&apos;t need a computer 
                science degree to know what you&apos;re paying for.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="text-primary text-2xl font-bold" aria-hidden="true">2.</span>
                We Build Stuff That Actually Works
              </h4>
              <p className="text-base leading-relaxed text-foreground/90">
                Every feature we add has to solve a real problem. We&apos;re not going to add a chatbot 
                just because it&apos;s trendy—we&apos;ll add it if it actually helps your customers. 
                If something doesn&apos;t make your life easier or your business better, we won&apos;t build it.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="text-primary text-2xl font-bold" aria-hidden="true">3.</span>
                Your Success = Our Success
              </h4>
              <p className="text-base leading-relaxed text-foreground/90">
                We&apos;re not happy unless you&apos;re happy. If the software we built saves you time, 
                makes you money, or just makes your day easier, that&apos;s a win. We&apos;ll check in 
                to see how things are going, and if something&apos; not working, we&apos;ll fix it.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-xl font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="text-primary text-2xl font-bold" aria-hidden="true">4.</span>
                We&apos;re In This For the Long Haul
              </h4>
              <p className="text-base leading-relaxed text-foreground/90">
                When we finish a project, that&apos;s not the end of the relationship. Your business 
                will grow and change, and your software should too. We&apos;re here to help you scale, 
                add features, or fix things when they break. We&apos;re your tech team, not just a 
                one-time vendor.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Values Section */}
      <AboutValuesSection data={data} />

      {/* Team Section */}
      <AboutTeamSection teams={teams} />
    </main>
  );
};

export default About;
