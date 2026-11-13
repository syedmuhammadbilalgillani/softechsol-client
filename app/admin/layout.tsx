import { AdminShell } from "@/components/SidebarLayout/admin-shell";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal - Softech Solutions",
  description: "Administrative portal for Softech Solutions",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AdminShell>{children}</AdminShell>
    </Providers>
  );
}

