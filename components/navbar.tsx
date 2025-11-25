"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const [open, setopen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Blogs",
      href: "/blogs",
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ];

  const isTransparent = pathname === "/" || pathname === "/contact";

  return (
    <nav
      aria-label="Main Navigation"
      className={`${
        isTransparent
          ? "bg-white/20 backdrop-blur-sm fixed top-0 left-0 right-0 z-50"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center max-w-[85vw] mx-auto py-3">
        <Link rel="preload" href="/" aria-label="Home">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
        </Link>
        <div className="hidden md:flex items-center gap-5">
          <ul className="flex gap-5">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium ${
                    isTransparent ? "text-white" : "text-gray-950"
                  }`}
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link rel="preload" href="/contact" aria-label="Contact Us">
            <Button variant={"outline"}>Contact Us</Button>
          </Link>
        </div>
        <Sheet open={open} onOpenChange={setopen}>
          <SheetTrigger className="md:hidden">
            <MenuIcon
              className={`w-8 h-8 ${
                isTransparent ? "text-white" : "text-gray-950"
              }`}
              aria-label="Open Menu"
            />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <Image src="/logo.svg" alt="logo" width={50} height={50} />
            </SheetHeader>
            <div className="flex flex-col gap-4 p-2 px-5">
              <ul>
                {navLinks.map((link, i) => (
                  <li
                    className="hover:bg-gray-100 p-2 rounded-md"
                    key={i}
                    onClick={() => setopen(false)}
                  >
                    <Link
                      rel="preload"
                      href={link.href}
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
