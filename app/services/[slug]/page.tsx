import ImageWrapper from "@/components/image-wrapper";
import { Button } from "@/components/ui/button";
import { DOMAIN_URL, STORAGE_URL } from "@/constants/url";
import { fetchServiceCategories, fetchServiceCategoryBySlug } from "@/lib/apis";
import logger from "@/lib/logger";
import { Layers, LayoutGrid } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const resolveImageUrl = (url?: string | null) => {
  if (!url) return "/placeholder.svg";
  return url.startsWith("/api") ? `${STORAGE_URL}${url}` : url;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const categorySlug = decodeURIComponent(slug);
    const category = await fetchServiceCategoryBySlug(categorySlug);

    if (!category) {
      return {
        title: "Service category not found",
        description: "The requested service category does not exist.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = category.name;
    const description =
      category.description ||
      `Explore our ${category.name} services at SoftechSol.`;
    const categoryUrl = `${DOMAIN_URL}/services/${categorySlug}`;
    const ogImage = resolveImageUrl(category.image?.url);

    return {
      title,
      description,
      metadataBase: new URL(DOMAIN_URL),
      openGraph: {
        title,
        description,
        url: categoryUrl,
        siteName: "SoftechSol",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: category.image?.altText || category.name,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
        creator: "@SoftechSol",
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `/services/${categorySlug}`,
      },
    };
  } catch (error) {
    logger.error(error, "Error generating metadata for service category page");
    return {
      title: "Services",
      description: "Explore our services at SoftechSol.",
    };
  }
}

const ServiceCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const categorySlug = decodeURIComponent(slug);

  const [category, allCategories] = await Promise.all([
    fetchServiceCategoryBySlug(categorySlug),
    fetchServiceCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const services = Array.isArray(category.services) ? category.services : [];
  const hasServices = services.length > 0;
  const heroImage = resolveImageUrl(category.image?.url);
  console.log("heroImage", heroImage);

  return (
    <main className="main py-10 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">
            /
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">
            /
          </li>
          <li className="text-gray-900 font-medium" aria-current="page">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative mb-14 overflow-hidden  md:mb-20">
        <div className=" grid grid-cols-2 gap-10">
          <div>
            <h1 className="mt-3 text-3xl font-bold text-black md:text-5xl">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-6 max-w-2xl text-base text-black/85 md:text-lg">
                {category.description}
              </p>
            )}
            <Link
              href="/contact"
              aria-label={`Get started with ${category.name}`}
              className="mx-auto mt-1 w-fit sm:mx-0"
            >
              <Button className="mt-6 capitalize">
                Request a free consultation
              </Button>
            </Link>
          </div>
          <Image
            height={650}
            width={650}
            src={heroImage}
            alt={category.image?.altText || category.name}
            className="object-contain rounded-2xl "
          />
        </div>
      </section>

      {/* Services Grid */}
      <section aria-labelledby="services-heading" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2
            id="services-heading"
            className="text-2xl font-bold text-gray-900 md:text-3xl"
          >
            What We Offer
          </h2>
          <span className="hidden text-sm text-gray-500 md:inline">
            {hasServices
              ? `${services.length} ${services.length === 1 ? "service" : "services"}`
              : ""}
          </span>
        </div>

        {!hasServices ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-4 py-16 text-center md:py-24">
            <div className="mb-6 rounded-full bg-gray-50 p-6">
              <LayoutGrid
                className="h-16 w-16 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">
              No Services Available
            </h3>
            <p className="mb-8 max-w-md text-gray-600">
              We&apos;re currently updating this category. Check back soon or
              explore our other services.
            </p>
            <Link href="/services" aria-label="Back to all services">
              <Button variant="outline" size="lg">
                Back to Services
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-20">
            {services.map((service, index) => {
              const serviceImageUrl = resolveImageUrl(service.image?.url);
              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-2 gap-10 items-center`}
                >
                  <div
                    className={`relative h-96 w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 ${index % 2 === 0 ? "order-1" : "order-2"} `}
                  >
                    {service.image ? (
                      <ImageWrapper
                        src={serviceImageUrl}
                        alt={service.image?.altText || service.title}
                        className="h-full w-full"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Layers
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex flex-1 flex-col gap-3 text-center sm:text-left ${index % 2 === 0 ? "order-2" : "order-1"} `}
                  >
                    <h3 className="text-xl font-bold text-gray-900 md:text-2xl">
                      {service.title}
                    </h3>
                    {service.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: service.description,
                        }}
                      ></div>
                    )}
                    <Link
                      href="/contact"
                      aria-label={`Get started with ${service.title}`}
                      className="mx-auto mt-1 w-fit sm:mx-0"
                    >
                      <Button variant="outline">Get Started</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 rounded-2xl bg-primary/5 p-8 text-center md:mt-20 md:p-14">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Ready to get started with {category.name}?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Let&apos;s discuss how our {category.name.toLowerCase()} services can
          help drive your business forward.
        </p>
        <Link href="/contact" className="mt-6 inline-block">
          <Button size="lg">Get in Touch</Button>
        </Link>
      </section>
    </main>
  );
};

export default ServiceCategoryPage;
