import { PageHeader } from "@/components/page-header";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import ContactPageClient from "./contact-page-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Inquiries - Softech Solutions Admin",
  description: "View and manage incoming customer leads and contact submissions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ContactAdminPage() {
  const rawContacts = await prisma.contactUs.findMany({
    orderBy: {
      submitted_at: "desc",
    },
    take: 500,
  });

  // Serialize dates cleanly for client component
  const contacts = rawContacts.map((c) => ({
    ...c,
    submitted_at: c.submitted_at.toISOString(),
    responded_at: c.responded_at ? c.responded_at.toISOString() : null,
  }));

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        heading="Contact Submissions & Leads"
        paragraph="Track incoming customer inquiries, service requests, and client proposals."
      />
      <ContactPageClient initialContacts={contacts} />
    </div>
  );
}
