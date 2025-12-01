import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";
import Heading from "@/components/heading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "SoftechSol's Terms of Service - Read our terms and conditions for using our website and services. Understand your rights and responsibilities.",
  openGraph: {
    title: "Terms of Service | SoftechSol",
    description:
      "Read SoftechSol's terms and conditions for using our website and services.",
    url: `${DOMAIN_URL}/terms-of-service`,
    siteName: "SoftechSol",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | SoftechSol",
    description: "Read SoftechSol's terms and conditions.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terms-of-service",
  },
};

const TermsOfServicePage = () => {
  const lastUpdated = "January 1, 2024";

  return (
    <main className="main py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <Heading as="h1" title="Terms of Service" />
          <p className="text-gray-600 mt-2">Last updated: {lastUpdated}</p>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Please read these Terms of Service ("Terms", "Terms of Service")
            carefully before using the SoftechSol website and services operated
            by SoftechSol ("us", "we", or "our"). Your access to and use of the
            Service is conditioned on your acceptance of and compliance with
            these Terms. These Terms apply to all visitors, users, and others
            who access or use the Service.
          </p>
        </section>

        {/* Agreement to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            1. Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our Service, you agree to be bound by these
            Terms. If you disagree with any part of these terms, then you may
            not access the Service. These Terms constitute a legally binding
            agreement between you and SoftechSol.
          </p>
        </section>

        {/* Use License */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            2. Use License
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Permission is granted to temporarily access and use the materials
              on SoftechSol's website for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by SoftechSol at any
              time.
            </p>
          </div>
        </section>

        {/* User Accounts */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            3. User Accounts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. You are
            responsible for safeguarding the password and for all activities
            that occur under your account. You must immediately notify us of any
            unauthorized use of your account.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            4. Intellectual Property Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of SoftechSol and its
            licensors. The Service is protected by copyright, trademark, and
            other laws. Our trademarks and trade dress may not be used in
            connection with any product or service without our prior written
            consent.
          </p>
        </section>

        {/* Prohibited Uses */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            5. Prohibited Uses
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            You may use our Service only for lawful purposes and in accordance
            with these Terms. You agree not to use the Service:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              In any way that violates any applicable national or international
              law or regulation
            </li>
            <li>
              To transmit, or procure the sending of, any advertising or
              promotional material without our prior written consent
            </li>
            <li>
              To impersonate or attempt to impersonate the company, a company
              employee, another user, or any other person or entity
            </li>
            <li>
              In any way that infringes upon the rights of others, or in any way
              is illegal, threatening, fraudulent, or harmful
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits anyone's
              use or enjoyment of the website
            </li>
          </ul>
        </section>

        {/* Service Availability */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            6. Service Availability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to withdraw or amend our Service, and any
            service or material we provide via the Service, in our sole
            discretion without notice. We will not be liable if, for any reason,
            all or any part of the Service is unavailable at any time or for any
            period. From time to time, we may restrict access to some parts of
            the Service, or the entire Service, to users.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            In no event shall SoftechSol, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your use of the Service.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">8. Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            The information on this website is provided on an "as is" basis. To
            the fullest extent permitted by law, SoftechSol excludes all
            representations, warranties, conditions, and terms relating to our
            website and the use of this website (including, without limitation,
            any warranties implied by law in respect of satisfactory quality,
            fitness for purpose, and/or the use of reasonable care and skill).
          </p>
        </section>

        {/* Indemnification */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            9. Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to defend, indemnify, and hold harmless SoftechSol and its
            licensee and licensors, and their employees, contractors, agents,
            officers and directors, from and against any and all claims,
            damages, obligations, losses, liabilities, costs or debt, and
            expenses (including but not limited to attorney's fees).
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            10. Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be interpreted and governed by the laws of the
            United States, without regard to its conflict of law provisions. Our
            failure to enforce any right or provision of these Terms will not be
            considered a waiver of those rights.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            11. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole
            discretion. By continuing to access or use our Service after those
            revisions become effective, you agree to be bound by the revised
            terms.
          </p>
        </section>

        {/* Severability */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            12. Severability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is held to be invalid or
            unenforceable by a court, the remaining provisions of these Terms
            will remain in effect. These Terms constitute the entire agreement
            between us regarding our Service, and supersede and replace any
            prior agreements we might have had between us regarding the Service.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-10 border-t pt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            13. Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:legal@softechsol.com"
                className="text-primary hover:underline"
              >
                legal@softechsol.com
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

export default TermsOfServicePage;
