import { ContactUsForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/page-header";
import prisma from "@/lib/prisma";
import logger from "@/utils/logger";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 100;

export const metadata: Metadata = {
  title: "Contact Forms - Softech Solutions",
  description: "View and manage contact form submissions from visitors",
  robots: {
    index: false,
    follow: false,
  },
};

const ContactPage = async () => {
  const contactsData = await prisma.contactUs.findMany({
    orderBy: {
      submitted_at: "desc",
    },
  });
  logger.debug(contactsData, "contacts data");
  return (
    <div className="p-5">
      <PageHeader heading="Contact Forms" paragraph="View and manage contact form submissions" />
      <div className="mt-4">
        <ContactUsForm services={[]} />
      </div>
    </div>
  );
};

export default ContactPage;
