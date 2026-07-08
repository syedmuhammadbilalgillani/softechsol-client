import Image from "next/image";
import { Check, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { STORAGE_URL } from "@/constants/url";

interface ServiceCategoryCardProps {
  slug: string;
  name: string;
  description: string | null;
  services: Array<{
    id: number | string;
    title: string;
    [key: string]: unknown;
  }>;
  image: {
    url: string;
    altText: string | null;
  } | null;
  index?: number;
}

const ServiceCategoryCard = ({
  slug,
  name,
  description,
  services,
  image,
  index = 0,
}: ServiceCategoryCardProps) => {
  // Alternate the image/content sides to create visual rhythm down the page.
  const imageFirst = index % 2 === 0;
  const url = image?.url
    ? image?.url?.startsWith("/api")
      ? `${STORAGE_URL}${image.url}`
      : `${image.url}`
    : "/placeholder.svg";
  const categoryHref = `/services/${slug}`;
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      <div className="grid items-stretch lg:grid-cols-2">
        {/* Image */}
        <Link
          href={categoryHref}
          aria-label={`View ${name} services`}
          className={`relative min-h-65 overflow-hidden bg-gray-100 lg:min-h-110 ${
            imageFirst ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {image ? (
            <Image
              src={url}
              alt={image.altText || name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Layers className="h-16 w-16 text-gray-300" aria-hidden="true" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-darkblue/25 to-transparent" />
        </Link>

        {/* Content */}
        <div
          className={`flex flex-col justify-center gap-6 p-8 md:p-10 lg:p-12 ${
            imageFirst ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-primary">
              <span className="h-px w-5 bg-primary" aria-hidden="true" />
              Service {String(index + 1).padStart(2, "0")}
            </span>
            <Link href={categoryHref} className="block w-fit">
              <h2 className="text-2xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-primary md:text-3xl">
                {name}
              </h2>
            </Link>
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              {description || ""}
            </p>
          </div>

          {services.length > 0 && (
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                What&apos;s Included
              </p>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-start gap-2.5 text-gray-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-snug md:text-base">
                      {service.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              aria-label={`View ${name} services`}
              className="cursor-pointer"
              href={categoryHref}
            >
              <Button variant="outline" aria-labelledby="View Services">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCategoryCard;
