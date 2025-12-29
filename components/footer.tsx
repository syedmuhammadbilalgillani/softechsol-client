"use client";
import { MAP_URL, socialMediaLinks } from "@/constants/url";
import { Mail, MailIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "./svgs/facebook";
import InstagramIcon from "./svgs/instagram";
import LinkedInIcon from "./svgs/linkedin";
export const handleClick =
  (email: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const mailto = `mailto:${email}`;

    // Try native mail app
    // window.location.href = mailto;

    // Fallback to Gmail after delay
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank",
        "noopener,noreferrer"
      );
    }, 500);
  };
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    { label: "Careers", href: "/careers" },
  ];

  const services = [
    { label: "Web Development", href: "/services" },
    { label: "Mobile App Development", href: "/services" },
    { label: "Software Solutions", href: "/services" },
    { label: "Digital Transformation", href: "/services" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      href: socialMediaLinks.linkedin,
      ariaLabel: "Visit our LinkedIn profile",
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      href: socialMediaLinks.facebook,
      ariaLabel: "Visit our Facebook page",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      href: socialMediaLinks.instagram,
      ariaLabel: "Visit our Instagram profile",
    },
    {
      name: "Email",
      icon: <MailIcon className="w-5 h-5 " />,
      href: "mailto:info@softechsol.com",
      ariaLabel: "Send us an email",
    },
  ];

  return (
    <footer className="bg-darkblue text-white">
      <div className="main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" aria-label="Home">
              <Image
                src="/logo.svg"
                alt="SoftechSol Logo"
                width={60}
                height={60}
                className=""
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Softechsol is a people-driven technology company that builds
              smart, reliable digital solutions and works closely with clients
              to help their businesses grow and succeed.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    aria-label={social.ariaLabel}
                    className="w-5 h-5 text-white  transition-all duration-300 flex items-center justify-center group"
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <address className="text-gray-300 text-sm not-italic leading-relaxed">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                    href={MAP_URL}
                  >
                    {socialMediaLinks.address}
                  </a>
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-5 h-5 text-primary shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${socialMediaLinks.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick(socialMediaLinks.email)}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {socialMediaLinks.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="w-5 h-5 text-primary shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`https://wa.me/${socialMediaLinks.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {socialMediaLinks.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SoftechSol. All rights reserved.
            </p>
            <div className="flex wrap gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
