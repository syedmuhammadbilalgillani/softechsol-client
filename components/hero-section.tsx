import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <header
      className="relative min-h-[85vh] max-h-[90vh] h-[85vh] flex items-center overflow-hidden"
      role="banner"
    >
      {/* Hero Image with priority loading */}
      <Image
        src="/home_hero.jpg"
        alt="SoftechSol - Software Development Company"
        fill
        priority
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
        quality={85}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#001E3A]/80 backdrop-blur-[1px] z-10" />

      <div className="container mx-auto relative z-20 grid md:grid-cols-2 gap-10 px-6 md:px-10">
        <div className="text-white flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-semibold  md:text-start text-center">
            Your Challenges, Our Smart Solutions
          </h2>

          <p className="mt-2 text-base md:text-lg opacity-90 md:text-start text-center">
            We are a team of passionate designers, strategists, and innovators
            committed to transforming ideas into compelling digital experiences.
            Creativity drives us, and results define us.
          </p>

          {/* CTA Buttons */}
          <nav className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button
              asChild
              className="text-black font-medium"
              variant="outline"
            >
              <Link href={`/projects`}>Browse Works</Link>
            </Button>

            <Button asChild className="font-medium flex items-center gap-2">
              <Link href={`/contact`}>Book a Call <ArrowRight /></Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
