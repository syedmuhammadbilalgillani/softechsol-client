import Image from "next/image";
import Heading from "./heading";
import ProjectCard from "./project-card";
import { Button } from "./ui/button";
import Link from "next/link";

const ProjectSection = () => {
  return (
    <main className="main py-10">
      <section aria-labelledby="projects-section">
        <Heading title="Recent Works" />
        <h3 className="text-3xl font-bold pb-5" id="projects-title">
          We turn your goals into tangible results{" "}
        </h3>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectCard key={index} data={null as any} />
          ))}
        </div>
      </section>
      <div className="flex justify-center mt-5">
        <Link href="/projects">
          <Button variant="outline" className="px-10">
            Read More
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default ProjectSection;
