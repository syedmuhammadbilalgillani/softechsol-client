"use client";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setopen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
    { label: "Learn With Us", href: "/learn-with-us" },
  ];

  const isTransparent = pathname === "/" || pathname === "/contact";
  const isHomePage = pathname === "/";

  // Scroll threshold - adjust this value to change when navbar changes color
  const SCROLL_THRESHOLD = 100;

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > SCROLL_THRESHOLD);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setopen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Handle overlay click to close menu
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setopen(false);
    }
  };

  // Determine if navbar should be transparent (only on home page when not scrolled)
  const shouldBeTransparent = isTransparent && (!isHomePage || !isScrolled);

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`${
          shouldBeTransparent
            ? "bg-white/20 backdrop-blur-sm fixed top-0 left-0 right-0 z-50"
            : `bg-white ${
                pathname === "/" ? "fixed top-0 left-0 right-0 z-50" : ""
              } `
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
                      shouldBeTransparent ? "text-white" : "text-gray-950"
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
          <button
            className="md:hidden"
            onClick={() => setopen(true)}
            aria-label="Open Menu"
          >
            <MenuIcon
              className={`w-8 h-8 ${
                shouldBeTransparent ? "text-white" : "text-gray-950"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Custom Mobile Menu */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          ref={menuRef}
          className={`fixed inset-y-0 right-0 h-full w-3/4 sm:max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            overscrollBehavior: "contain",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
            <button
              onClick={() => setopen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close Menu"
            >
              <XIcon className="w-6 h-6 text-gray-950" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
              overscrollBehavior: "contain",
            }}
          >
            <div className="flex flex-col gap-4 p-2 px-5">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <li
                    key={i}
                    className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                  >
                    <Link
                      rel="preload"
                      href={link.href}
                      className="w-full block text-gray-950"
                      aria-label={link.label}
                      onClick={() => setopen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
