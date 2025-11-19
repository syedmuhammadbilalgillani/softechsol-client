"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
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
      label: "Learn With Us",
      href: "/blogs",
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ];
  return (
    <nav
      className={`${
        pathname === "/"
          ? "bg-white/20 backdrop-blur-sm fixed top-0 left-0 right-0 z-50"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center max-w-[85vw] mx-auto py-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="bg-white rounded-full"
          />
        </Link>
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === "/" ? "text-white" : "text-gray-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href={"/contact"}>
            <Button variant={"outline"}>Contact Us</Button>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MenuIcon className="w-8 h-8 text-white" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <div className="hidden">
                <SheetTitle className="hidden" />
              </div>
              <Image src="/logo.png" alt="logo" width={60} height={60} />
            </SheetHeader>
            <div className="flex flex-col gap-4 p-2 px-5">
              {navLinks.map((link, i) => (
                <Link key={i} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
