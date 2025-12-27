import Link from "next/link";
import ImageWrapper from "./image-wrapper";
import { Blog } from "@/constants/types";
import { GalleryItem } from "@/app/generated/prisma";
import { STORAGE_URL } from "@/constants/url";

type BlogCardProps = {
  data: Blog;
};

const BlogCard = ({ data }: BlogCardProps) => {
  if (!data) return null;

  const primaryCategory = data.categories?.[0]?.category ?? null;

  const categorySlug = primaryCategory?.slug;
  const blogSlug = (data as any)?.slug as string | undefined;

  const categoryHref = categorySlug ? `/blogs/${categorySlug}` : "/blogs";
  const blogHref =
    categorySlug && blogSlug ? `/blogs/${categorySlug}/${blogSlug}` : "/blogs";

  const imageUrl =
    data?.featured_image?.url &&
    data?.featured_image?.url?.startsWith("https://res.cloudinary.com")
      ? data?.featured_image?.url
      : `${STORAGE_URL}${data?.featured_image?.url}`;
  const imageAlt =
    data?.featured_image?.altText || data.title || "Blog featured image";

  return (
    <article className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <ImageWrapper
            src={imageUrl}
            alt={imageAlt}
            width={500}
            height={400}
            className="rounded-t-2xl h-[220px]  w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-[220px]  w-full items-center justify-center bg-gray-100 text-gray-400 text-xs">
            No image available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5 gap-3">
        <header className="space-y-2">
          {primaryCategory && (
            <Link rel="preload" href={categoryHref}>
              <span className="inline-flex items-center border rounded-full px-3 py-1 text-[11px] font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors">
                {primaryCategory.name || "Category"}
              </span>
            </Link>
          )}

          <h3 className="text-xl font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {data.title || "Untitled Blog Post"}
          </h3>
        </header>

        {data.excerpt && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {data.excerpt}
          </p>
        )}

        <div className="mt-auto pt-2">
          <Link
            href={blogHref}
            rel="preload"
            className="text-sm font-medium text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
