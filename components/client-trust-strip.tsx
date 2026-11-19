import React from "react";
import Image from "next/image";

interface ClientTrustStripProps {
  variant?: "light" | "dark";
}

export const ClientTrustStrip = ({ variant = "light" }: ClientTrustStripProps) => {
  const isDark = variant === "dark";

  const logos = [
    {
      src: "/clients/kips.svg",
      alt: "KIPS",
      width: 120,
      height: 45,
      className: "h-7 sm:h-8 md:h-9 w-auto object-contain",
    },
    {
      src: "/clients/gce.svg",
      alt: "GCE Solutions",
      width: 120,
      height: 28,
      className: "h-5 sm:h-5.5 md:h-6 w-auto object-contain",
    },
    {
      src: "/clients/uscivilgenix.svg",
      alt: "US Civilgenix",
      width: 150,
      height: 40,
      className: "h-6 sm:h-6.5 md:h-7.5 w-auto object-contain",
    },
    {
      src: "/clients/premiersalt.webp",
      alt: "Premier Salt",
      width: 130,
      height: 40,
      className: "h-7 sm:h-7.5 md:h-8 w-auto object-contain",
    },
    {
      src: "/clients/skg.png",
      alt: "Samuel K. Golden",
      width: 160,
      height: 50,
      className: "h-8 sm:h-8.5 md:h-16 w-auto object-contain",
    },
    {
      src: "/clients/printinbudget.webp",
      alt: "Print In Budget",
      width: 160,
      height: 40,
      className: "h-6 sm:h-6.5 md:h-7.5 w-auto object-contain",
    },
  ];

  return (
    <section
      aria-label="Trusted Clients"
      className={`w-full py-5 md:py-7 px-4 sm:px-6 ${
        isDark
          ? "border-y border-white/10 bg-[#091122]/90 text-white"
          : "border-y border-slate-200/80 bg-slate-50/60"
      }`}
    >
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8">
        <p
          className={`text-xs uppercase tracking-widest font-semibold text-center lg:text-left shrink-0 whitespace-nowrap ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Trusted By Industry Leaders
        </p>

        {/* Single Non-Wrapping Row with balanced logo items */}
        <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8 md:gap-10 lg:gap-11 flex-nowrap overflow-x-auto w-full lg:w-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center shrink-0 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={logo.className}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTrustStrip;
