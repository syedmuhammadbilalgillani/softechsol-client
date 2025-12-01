import { Metadata } from "next";
import { DOMAIN_URL, socialMediaLinks } from "@/constants/url";
import Heading from "@/components/heading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SoftechSol's Privacy Policy - Learn how we collect, use, and protect your personal information. Your privacy is important to us.",
  openGraph: {
    title: "Privacy Policy | SoftechSol",
    description:
      "Learn how SoftechSol collects, uses, and protects your personal information. Your privacy is important to us.",
    url: `${DOMAIN_URL}/privacy-policy`,
    siteName: "SoftechSol",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | SoftechSol",
    description: "Learn how SoftechSol protects your personal information.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <main className="main py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <Heading as="h1" title="Privacy Policy" />
          <p className="text-gray-600 mt-2">Last updated: {lastUpdated}</p>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            At SoftechSol, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website and use our services. Please
            read this privacy policy carefully. If you do not agree with the
            terms of this privacy policy, please do not access the site.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            1. Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                1.1 Personal Information
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 ml-4">
                <li>Register on our website</li>
                <li>Fill out a contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
                <li>Apply for a job opening</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                This information may include your name, email address, phone
                number, company name, and any other information you choose to
                provide.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                1.2 Automatically Collected Information
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When you visit our website, we may automatically collect certain
                information about your device, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages you visit and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Respond to your inquiries and fulfill your requests</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Process job applications</li>
            <li>Improve and personalize your experience on our website</li>
            <li>Analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information in the following
            circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party service providers who perform services on our behalf,
              such as hosting, analytics, and email delivery.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required by law or in response to valid legal
              requests.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be
              transferred.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information
              with your explicit consent.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction. However, no method
            of transmission over the Internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use cookies and similar tracking technologies to track activity
            on our website and store certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent. However, if you do not accept cookies, you may not be able to
            use some portions of our website.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            6. Your Privacy Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              <strong>Access:</strong> Request access to your personal
              information
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate data
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal
              information
            </li>
            <li>
              <strong>Objection:</strong> Object to processing of your personal
              information
            </li>
            <li>
              <strong>Portability:</strong> Request transfer of your data to
              another service
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:privacy@softechsol.com"
              className="text-primary hover:underline"
            >
              privacy@softechsol.com
            </a>
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            7. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you are a parent or guardian and believe your child has provided
            us with personal information, please contact us immediately.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. You are advised to review this
            Privacy Policy periodically for any changes.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10 border-t pt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">9. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@softechsol.com"
                className="text-primary hover:underline"
              >
                privacy@softechsol.com
              </a>
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Address:</strong>{" "}
              <a href="https://www.google.com/maps/place/GCE+Pvt.+Ltd./@31.5322122,74.3455412,17z/data=!3m1!4b1!4m6!3m5!1s0x3919050020b4027b:0xd671dbfe09a12d6a!8m2!3d31.5322122!4d74.3455412!16s%2Fg%2F11y3wxtyd0!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D">
                {socialMediaLinks.address}
              </a>
            </p>
          </div>
        </section>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t">
          <Link
            href="/"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
