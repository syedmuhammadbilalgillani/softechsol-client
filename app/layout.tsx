import { Toaster } from "@/components/ui/sonner";

// Lazy load Navbar and Footer for mobile optimization
const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: true, // Keep SSR for SEO
});

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true, // Keep SSR for SEO
});
import { DOMAIN_URL } from "@/constants/url";
import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: {
    default: "SoftechSol - Software Development Company",
    template: "%s | SoftechSol",
  },
  description:
    "SoftechSol is a leading software development company providing innovative software solutions, web development, mobile apps, and digital transformation services to businesses worldwide.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "digital transformation",
    "software solutions",
    "custom software",
    "SoftechSol",
  ],
  authors: [{ name: "SoftechSol" }],
  creator: "SoftechSol",
  publisher: "SoftechSol",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: DOMAIN_URL,
    siteName: "SoftechSol",
    title: "SoftechSol - Software Development Company",
    description:
      "Leading software development company providing innovative software solutions, web development, mobile apps, and digital transformation services.",
    images: [
      {
        url: `${DOMAIN_URL}/home_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "SoftechSol - Software Development Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftechSol - Software Development Company",
    description:
      "Leading software development company providing innovative software solutions and digital transformation services.",
    images: [`${DOMAIN_URL}/home_hero.jpg`],
    creator: "@SoftechSol",
    site: "@SoftechSol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/home_hero.jpg"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${funnelDisplay.variable} antialiased`}
      >
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
