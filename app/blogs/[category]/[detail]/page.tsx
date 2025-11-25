import { GalleryItem } from "@/app/generated/prisma";
import BlogCard from "@/components/blog-card";
import Heading from "@/components/heading";
import ImageWrapper from "@/components/image-wrapper";
import { Button } from "@/components/ui/button";
import { Blog } from "@/constants/types";
import { DOMAIN_URL } from "@/constants/url";
import {
  fetchBlogBySlug,
  fetchBlogsByCategory,
  fetchCategories,
} from "@/lib/apis";
import logger from "@/lib/logger";
import { Calendar, ChevronLeft, Clock, User } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Generate metadata for blog detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; detail: string }>;
}): Promise<Metadata> {
  try {
    const { category, detail } = await params;
    const categorySlug = decodeURIComponent(category);
    const blogSlug = decodeURIComponent(detail);

    const blog = await fetchBlogBySlug(categorySlug, blogSlug);

    if (!blog) {
      return {
        title: "Blog post not found | SoftechSol",
        description: "The requested blog post does not exist.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = blog.meta_title || blog.title || "Blog Post";
    const description =
      blog.meta_description ||
      blog.excerpt ||
      "Read this article from SoftechSol.";
    const ogImage =
      (blog.og_image as GalleryItem | null)?.url ||
      (blog.featured_image as GalleryItem | null)?.url ||
      `${DOMAIN_URL}/home_hero.jpg`;
    const ogAlt =
      (blog.og_image as GalleryItem | null)?.altText ||
      (blog.featured_image as GalleryItem | null)?.altText ||
      title;
    const blogUrl = `${DOMAIN_URL}/blogs/${categorySlug}/${blogSlug}`;

    return {
      title,
      description: description.substring(0, 160),
      metadataBase: new URL(DOMAIN_URL),
      keywords: blog.meta_keywords?.split(",").map((k: string) => k.trim()),
      authors: blog.author
        ? [
            {
              name:
                `${blog.author.first_name || ""} ${
                  blog.author.last_name || ""
                }`.trim() || blog.author.username,
            },
          ]
        : undefined,
      openGraph: {
        title,
        description: description.substring(0, 160),
        url: blogUrl,
        siteName: "SoftechSol",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: ogAlt,
          },
        ],
        type: "article",
        publishedTime: blog.publish_date
          ? new Date(blog.publish_date).toISOString()
          : undefined,
        modifiedTime: blog.updated_at
          ? new Date(blog.updated_at).toISOString()
          : undefined,
        authors: blog.author
          ? [
              `${blog.author.first_name || ""} ${
                blog.author.last_name || ""
              }`.trim() || blog.author.username,
            ]
          : undefined,
        tags: blog.categories.map((cat: any) => cat.category.name),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: description.substring(0, 160),
        images: [ogImage],
        creator: "@SoftechSol",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: blogUrl,
      },
    };
  } catch (error) {
    logger.error(error, "Error generating metadata for blog detail page");
    return {
      title: "Blog Post | SoftechSol",
      description: "Read this article from SoftechSol.",
    };
  }
}

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ category: string; detail: string }>;
}) => {
  let blog = null;
  let relatedBlogs: Blog[] = [];
  let allCategories: Array<{ slug: string; name: string }> = [];

  try {
    const { category, detail } = await params;
    const categorySlug = decodeURIComponent(category);
    const blogSlug = decodeURIComponent(detail);

    // Fetch blog, category, and related blogs in parallel
    const [fetchedBlog, fetchedCategories] = await Promise.all([
      fetchBlogBySlug(categorySlug, blogSlug),
      fetchCategories(),
    ]);

    blog = fetchedBlog;
    allCategories = Array.isArray(fetchedCategories)
      ? fetchedCategories.map((cat) => ({ slug: cat.slug, name: cat.name }))
      : [];

    // If blog doesn't exist, show 404
    if (!blog) {
      notFound();
    }

    // Fetch related blogs from the same category
    if (categorySlug) {
      const related = await fetchBlogsByCategory(categorySlug);
      relatedBlogs = Array.isArray(related)
        ? (related as any[]).filter((b) => b.slug !== blogSlug).slice(0, 3)
        : [];
    }
  } catch (error) {
    logger.error(error, "Error fetching blog details");
    if (!blog) {
      notFound();
    }
  }

  const featuredImage = blog.featured_image as GalleryItem | null;
  const imageUrl = featuredImage?.url || "";
  const imageAlt =
    featuredImage?.altText || blog.title || "Blog featured image";

  const primaryCategory =
    blog.categories && blog.categories[0]?.category
      ? blog.categories[0].category
      : null;

  const authorName =
    blog.author &&
    `${blog.author.first_name || ""} ${blog.author.last_name || ""}`.trim()
      ? `${blog.author.first_name} ${blog.author.last_name}`.trim()
      : blog.author?.username || "Unknown Author";

  const publishDate = blog.publish_date || blog.created_at;
  const formattedDate = publishDate
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(publishDate))
    : "";

  // Estimate reading time (average 200 words per minute)
  const readingTime = blog.content
    ? Math.ceil(blog.content.split(/\s+/).length / 200)
    : null;

  return (
    <main className="main py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
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
                href="/blogs"
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            {primaryCategory && (
              <>
                <li aria-hidden="true" className="text-gray-400">
                  /
                </li>
                <li>
                  <Link
                    href={`/blogs/${primaryCategory.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {primaryCategory.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {blog.title}
            </li>
          </ol>
        </nav>

        <article className="space-y-8">
          {/* Article Header */}
          <header className="space-y-4">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.categories.map((catRelation: any) => {
                  const cat = catRelation.category;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/blogs/${cat.slug}`}
                      className="inline-flex items-center border rounded-full px-4 py-1 text-xs font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pt-2 border-t border-gray-200">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{authorName}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={new Date(publishDate).toISOString()}>
                    {formattedDate}
                  </time>
                </div>
              )}
              {readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{readingTime} min read</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <section aria-label="Featured image">
              <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200">
                <ImageWrapper
                  src={imageUrl}
                  alt={imageAlt}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </section>
          )}

          {/* Article Content */}
          <section
            aria-labelledby="article-content"
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-img:rounded-xl prose-img:shadow-md"
            suppressHydrationWarning
          >
            <div
              id="article-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </section>

          {/* Categories Navigation */}
          {allCategories.length > 0 && (
            <section
              aria-labelledby="blog-categories-heading"
              className="border-t border-b border-gray-200 py-6"
            >
              <h2 id="blog-categories-heading" className="sr-only">
                Browse More Categories
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-gray-700">
                  Browse by category:
                </span>
                {allCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blogs/${category.slug}`}
                    className="inline-block bg-primary/5 hover:bg-primary hover:text-white text-sm transition-all duration-300 py-1.5 px-4 rounded-full border border-primary/10"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <section
              aria-labelledby="related-articles-heading"
              className="border-t border-gray-200 pt-8"
            >
              <Heading title="Related Articles" />
              <p
                id="related-articles-heading"
                className="text-lg text-gray-600 mb-6"
              >
                More articles from {primaryCategory?.name || "this category"}
              </p>
              <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((relatedBlog: Blog, index) => (
                  <BlogCard
                    key={relatedBlog.slug || index}
                    data={relatedBlog}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Back to Category */}
          {primaryCategory && (
            <div className="flex justify-center pt-8">
              <Link href={`/blogs/${primaryCategory.slug}`}>
                <Button variant="outline" size="lg">
                  <ChevronLeft /> Back to {primaryCategory.name}
                </Button>
              </Link>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};

export default BlogDetailPage;
