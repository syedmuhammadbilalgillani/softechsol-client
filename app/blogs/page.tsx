import BlogCard from "@/components/blog-card";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { fetchBlogs, fetchCategories } from "@/lib/apis";
import logger from "@/lib/logger";
import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "../generated/prisma/browser";
import { Blog } from "@/constants/types";
import { DOMAIN_URL } from "@/constants/url";

export const metadata = {
  title: "Blog & Articles | SoftechSol",
  description:
    "Read the latest articles, insights, and stories from SoftechSol.",
  metadataBase: new URL(DOMAIN_URL), // Replace with your website's base URL
  openGraph: {
    title: "Blog & Articles | SoftechSol",
    description:
      "Explore the latest insights, articles, and updates from SoftechSol.",
    url: `${DOMAIN_URL}/blogs`, // Replace with your blog page URL
    siteName: "SoftechSol",
    images: [
      {
        url: "/favicon.png", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "SoftechSol Blog Cover Image",
      },
    ],
    type: "website", // You can adjust this depending on the page type (article, website, etc.)
  },
  twitter: {
    card: "summary_large_image", // Use "summary_large_image" or "summary" depending on the content
    title: "Blog & Articles | SoftechSol",
    description: "Discover insights, articles, and more from SoftechSol.",
    image: "/favicon.png", // Replace with your Twitter image URL
    creator: "@SoftechSol", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/blogs", // Replace with the canonical URL of your page
  },
};

const BlogPage = async () => {
  let categories: Array<{ slug: string; name: string }> = [];
  let blogs: Blog[] = [];

  // Handle API errors safely
  try {
    const [fetchedCategories, fetchedBlogs] = await Promise.all([
      fetchCategories(),
      fetchBlogs(),
    ]);

    categories = Array.isArray(fetchedCategories) ? fetchedCategories : [];
    blogs = Array.isArray(fetchedBlogs) ? (fetchedBlogs as Blog[]) : [];
  } catch (error) {
    logger.error(error, "Error fetching blogs or categories");
  }

  const hasBlogs = blogs && blogs.length > 0;
  const firstBlog = hasBlogs ? blogs[0] : null;
  const remainingBlogs = hasBlogs ? blogs.slice(1) : [];

  const primaryCategory =
    firstBlog?.categories && firstBlog.categories[0]?.category
      ? firstBlog.categories[0].category
      : null;

  const firstBlogCategoryHref = primaryCategory?.slug
    ? `/blogs/${primaryCategory.slug}`
    : "/blogs";

  const firstBlogHref =
    primaryCategory?.slug && firstBlog?.slug
      ? `/blogs/${primaryCategory.slug}/${firstBlog.slug}`
      : "/blogs";

  const firstBlogImage = firstBlog?.featured_image as GalleryItem | undefined;
  const firstBlogImageUrl = firstBlogImage?.url || "";
  const firstBlogImageAlt =
    firstBlogImage?.altText || firstBlog?.title || "Blog featured image";

  return (
    <main className="main py-12">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-start mb-3">
            Blog &amp; Articles
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Explore the latest insights, tips, and updates from our team.
          </p>
        </header>

        {/* Categories */}
        <section aria-labelledby="blog-categories-heading" className="mb-10">
          <h2 id="blog-categories-heading" className="sr-only">
            Blog Categories
          </h2>
          {categories.length > 0 && (
            <nav aria-label="Blog categories">
              <ul className="flex flex-wrap gap-3 md:gap-4">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/blogs/${category.slug}`}>
                      <span className="inline-block bg-primary/5 hover:bg-primary hover:text-white text-sm md:text-base transition-all duration-300 py-2 px-5 md:px-7 rounded-full border border-primary/10 shadow-sm cursor-pointer">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </section>

        {/* Hero / Featured Blog */}
        <section aria-labelledby="featured-blog-heading" className="mb-12">
          <header className="flex items-center justify-between mb-6">
            <h2
              id="featured-blog-heading"
              className="text-2xl md:text-3xl font-semibold"
            >
              Featured Article
            </h2>
            {hasBlogs && (
              <Link
                href="/blogs"
                className="text-sm text-primary hover:underline"
              >
                View all posts
              </Link>
            )}
          </header>

          {!hasBlogs ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              <p>No blog posts available yet. Check back soon.</p>
            </div>
          ) : (
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center rounded-2xl border border-gray-100 bg-white shadow-sm p-5 md:p-7">
              <div className="relative w-full overflow-hidden rounded-2xl">
                {firstBlogImageUrl ? (
                  <Image
                    src={firstBlogImageUrl}
                    alt={firstBlogImageAlt}
                    width={800}
                    height={600}
                    className="h-[260px] md:h-[340px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    priority
                  />
                ) : (
                  <div className="flex h-[260px] md:h-[340px] w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-400 text-sm">
                    No image available
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  {primaryCategory && (
                    <Link
                      className="inline-flex items-center border rounded-full px-4 py-1 text-xs font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors"
                      href={firstBlogCategoryHref}
                    >
                      {primaryCategory.name || "Category"}
                    </Link>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  {firstBlog?.title || "Untitled Blog Post"}
                </h3>

                {firstBlog?.excerpt && (
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed line-clamp-3">
                    {firstBlog.excerpt}
                  </p>
                )}

                <div className="pt-2">
                  <Link href={firstBlogHref}>
                    <Button size="lg">Read More</Button>
                  </Link>
                </div>
              </div>
            </article>
          )}
        </section>

        {/* Blog List */}
        <section aria-labelledby="blog-list-heading" className="space-y-3">
          <Heading title="Blog Posts" />
          <h2
            id="blog-list-heading"
            className="text-lg md:text-xl text-gray-600"
          >
            Latest insights and trends
          </h2>

          {!hasBlogs ? (
            <p className="mt-4 text-gray-500">
              There are no posts to display right now.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog: Blog, index) => (
                <BlogCard key={index} data={blog} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BlogPage;
