import type { Metadata } from "next";
import { Funnel_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softechsol",
  description:
    "Softechsol is a software development company that provides software development services to businesses.",
  icons: {
    icon: `/favicon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${funnelDisplay.variable} antialiased`}
      >
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
