import AboutBanner from "@/components/about-banner";
import BenifitsBanner from "@/components/benifits-banner";
import FaqsSection from "@/components/faqs-section";
import HeroSection from "@/components/hero-section";
import ProjectSection from "@/components/project-section";
import ServicesSection from "@/components/services-section";
import TestimonialSection from "@/components/testimonial-section";

const Home = () => {
  return (
    <>
      <h1 className="text-[1px] text-transparent absolute top-0 left-0">
        Softechsol
      </h1>
      <HeroSection />
      <AboutBanner />
      <BenifitsBanner />
      <ProjectSection />
      <ServicesSection />
      <TestimonialSection />
      <FaqsSection />
    </>
  );
};

export default Home;
