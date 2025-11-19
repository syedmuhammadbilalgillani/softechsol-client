import Heading from "@/components/heading";
import ImageWrapper from "@/components/image-wrapper";
import TeamCard from "@/components/team-card";
import { fetchTeams } from "@/lib/apis";
import logger from "@/lib/logger";
import { GalleryItem, Team } from "../generated/prisma/browser";

const data = [
  {
    label: "Excellence",
    description:
      "We pursue the highest standards in strategy, design, and execution ensuring every project is crafted with precision, creativity, and impact.",
  },
  {
    label: "Transparency",
    description:
      "Clear communication and honest collaboration guide everything we do. We keep our process open so clients always know where their project stands.",
  },
  {
    label: "Innovation",
    description:
      "We stay ahead of trends and technology to deliver bold, modern solutions that set brands apart and drive real results.",
  },
  {
    label: "Collaboration",
    description:
      "Your vision shapes our work. We partner with you closely, combining insights and creativity to bring your brand to life.",
  },
];
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

      <section
        aria-labelledby="core-values"
        className="grid md:grid-cols-2 grid-cols-1"
      >
        {data.map((item, index) => (
          <article
            key={index}
            className={` md:p-10 py-10  border-b ${
              index % 2 === 0 ? "md:border-r-2 " : ""
            } ${index >= 2 ? "md:border-t-2 " : ""}`}
          >
            <h3 className="text-2xl font-bold">{item.label}</h3>
            <p className="text-lg">{item.description}</p>
          </article>
        ))}
      </section>
      <section className="grid md:grid-cols-5 grid-cols-1 place-items-start py-10 gap-5">
        <Heading title="The Team" className="md:col-span-1 col-span-5" />
        <div className="md:col-span-4 col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
