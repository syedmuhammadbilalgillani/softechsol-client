import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <header
      className="relative min-h-[85vh] max-h-[90vh] h-[85vh] flex items-center"
      style={{
        backgroundImage: "url('/home_hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="banner"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#001E3A]/80 backdrop-blur-[1px]" />

      <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-10 px-6 md:px-10">
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
            <Button className="text-black font-medium" variant="outline">
              Browse Works
            </Button>

            <Button className="font-medium flex items-center gap-2">
              Book a Call <ArrowRight />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
