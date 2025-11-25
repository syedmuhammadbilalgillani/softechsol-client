import React from "react";
import Heading from "./heading";
import Image from "next/image";
import { Button } from "./ui/button";

const AboutBanner = () => {
  return (
    <main className="main py-10 grid md:grid-cols-2 grid-cols-1 place-items-center gap-10">
      <div className="space-y-4">
        <Heading title="About Us" />
        <Image
          src="/about_us_banner.jpg"
          alt="About Us"
          width={500}
          height={500}
          className="rounded-xl"
          sizes="(max-width: 768px) 100vw, 500px"
          quality={85}
        />
      </div>
      <div className="space-y-4">
        <p className="text-2xl">
          We are a team of passionate designers, strategists, and innovators
          committed to transforming ideas into compelling digital experiences.
          Creativity drives us, results define us.
        </p>
        <Button variant={"outline"}>Read More</Button>
      </div>
    </main>
  );
};

export default AboutBanner;
