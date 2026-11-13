import { DOMAIN_URL } from "@/constants/url";
import { fetchAllJobSlugs, fetchJobBySlug } from "@/lib/apis";
import logger from "@/lib/logger";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Mail, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const jobs = await fetchAllJobSlugs();
    return jobs.map((job) => ({
      slug: job.slug,
    }));
  } catch (error) {
    logger.error("Error generating static params for careers:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const job = await fetchJobBySlug(decodedSlug);

    if (!job) {
      return {
        title: "Job Not Found | SoftechSol Careers",
        description: "The requested job position does not exist or has closed.",
        robots: { index: false, follow: false },
      };
    }

    const title = job.meta_title || `${job.title} | SoftechSol Careers`;
    const description =
      job.meta_description ||
      `Apply for the ${job.title} position at SoftechSol. ${job.location ? `Location: ${job.location}.` : ""} ${job.job_type ? `Type: ${job.job_type}.` : ""}`;
    const jobUrl = `${DOMAIN_URL}/careers/${decodedSlug}`;

    return {
      title,
      description,
      metadataBase: new URL(DOMAIN_URL),
      openGraph: {
        title,
        description,
        url: jobUrl,
        siteName: "SoftechSol",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `/careers/${decodedSlug}`,
      },
    };
  } catch (error) {
    logger.error("Error generating metadata for career page:", error);
    return {
      title: "Careers | SoftechSol",
      description: "Explore career opportunities at SoftechSol.",
    };
  }
}

const CareerDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const job = await fetchJobBySlug(decodedSlug);

  if (!job) {
    notFound();
  }

  const sanitizedDescription = DOMPurify.sanitize(job.description || "");
  const sanitizedRequirements = job.requirements ? DOMPurify.sanitize(job.requirements) : null;
  const sanitizedResponsibilities = job.responsibilities ? DOMPurify.sanitize(job.responsibilities) : null;

  const hasSalary = job.salary_min !== null || job.salary_max !== null;
  const salaryString = hasSalary
    ? `${job.salary_min ? `${job.salary_currency || "USD"} ${job.salary_min.toLocaleString()}` : ""}${job.salary_min && job.salary_max ? " - " : ""}${job.salary_max ? `${job.salary_max.toLocaleString()}` : ""}`
    : null;

  return (
    <main className="main py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <Link
          href="/careers"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Careers
        </Link>
      </div>

      <header className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {job.categories?.map(({ category }) => (
            <Badge key={category.slug} variant="secondary">
              {category.name}
            </Badge>
          ))}
          {job.is_featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
              Featured
            </Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {job.title}
        </h1>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-600">
          {job.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {job.location}
            </span>
          )}
          {job.job_type && (
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-4 text-primary" />
              {job.job_type}
            </span>
          )}
          {job.experience_level && (
            <span className="inline-flex items-center gap-1.5">
              <Award className="size-4 text-primary" />
              {job.experience_level}
            </span>
          )}
          {salaryString && (
            <span className="inline-flex items-center gap-1.5 font-medium text-gray-800">
              <DollarSign className="size-4 text-emerald-600" />
              {salaryString}
            </span>
          )}
          {job.publish_date && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-gray-400" />
              Posted {new Date(job.publish_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Role</h2>
            <div
              className="prose prose-gray max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </section>

          {sanitizedResponsibilities && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <div
                className="prose prose-gray max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedResponsibilities }}
              />
            </section>
          )}

          {sanitizedRequirements && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <div
                className="prose prose-gray max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedRequirements }}
              />
            </section>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Apply for this position</h3>
            <p className="text-sm text-gray-600">
              Ready to take the next step in your career with SoftechSol? Send us your application today.
            </p>

            <div className="space-y-3">
              {job.application_url && (
                <a
                  href={job.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block"
                >
                  <Button className="w-full inline-flex items-center justify-center gap-2">
                    Apply Online <ExternalLink className="size-4" />
                  </Button>
                </a>
              )}

              {job.application_email && (
                <a
                  href={`mailto:${job.application_email}?subject=Application for ${encodeURIComponent(job.title)}`}
                  className="w-full inline-block"
                >
                  <Button variant="outline" className="w-full inline-flex items-center justify-center gap-2">
                    <Mail className="size-4" /> Email Application
                  </Button>
                </a>
              )}

              {!job.application_url && !job.application_email && (
                <Link href="/contact" className="w-full inline-block">
                  <Button className="w-full">Contact Us to Apply</Button>
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CareerDetailPage;

