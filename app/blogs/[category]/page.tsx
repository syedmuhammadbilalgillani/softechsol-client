import BlogCard from "@/components/blog-card";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { fetchBlogsByCategory, fetchCategoryBySlug, fetchCategories } from "@/lib/apis";
import logger from "@/lib/logger";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { DOMAIN_URL } from "@/constants/url";
import { Blog } from "@/constants/types";
import { unstable_cache } from "next/cache";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Generate metadata for category page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  try {
    const { category } = await params;
    const categorySlug = decodeURIComponent(category);
    const categoryData = await fetchCategoryBySlug(categorySlug);

    if (!categoryData) {
      return {
        title: "Category not found | SoftechSol",
        description: "The requested blog category does not exist.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = categoryData.meta_title || `${categoryData.name} | SoftechSol Blog`;
    const description = categoryData.meta_description || categoryData.description || `Explore articles in the ${categoryData.name} category from SoftechSol.`;
    const categoryUrl = `${DOMAIN_URL}/blogs/${categorySlug}`;

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
            url: `${DOMAIN_URL}/home_hero.jpg`,
            width: 1200,
            height: 630,
            alt: `${categoryData.name} Category`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${DOMAIN_URL}/home_hero.jpg`],
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
        canonical: categoryUrl,
      },
    };
  } catch (error) {
    logger.error(error, "Error generating metadata for category page");
    return {
      title: "Category | SoftechSol Blog",
      description: "Browse blog articles by category.",
    };
  }
}

const BlogCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  let categoryData = null;
  let blogs: Blog[] = [];
  let allCategories: Array<{ slug: string; name: string }> = [];

  try {
    const { category } = await params;
    const categorySlug = decodeURIComponent(category);

    // Fetch category and blogs in parallel
    const [fetchedCategory, fetchedBlogs, fetchedCategories] = await Promise.all([
      fetchCategoryBySlug(categorySlug),
      fetchBlogsByCategory(categorySlug),
      fetchCategories(),
    ]);

    categoryData = fetchedCategory;
    blogs = Array.isArray(fetchedBlogs) ? (fetchedBlogs as any[]) : [];
    allCategories = Array.isArray(fetchedCategories)
      ? fetchedCategories.map((cat) => ({ slug: cat.slug, name: cat.name }))
      : [];

    // If category doesn't exist, show 404
    if (!categoryData) {
      notFound();
    }
  } catch (error) {
    logger.error(error, "Error fetching category or blogs");
    // If there's an error and we don't have category data, show 404
    if (!categoryData) {
      notFound();
    }
  }

  const hasBlogs = blogs && blogs.length > 0;

  return (
    <main className="main py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link rel="preload" href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li>
              <Link rel="preload" href="/blogs" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">
              /
            </li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {categoryData.name}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-start mb-3">
            {categoryData.name}
          </h1>
          {categoryData.description && (
            <p className="text-gray-600 max-w-2xl">
              {categoryData.description}
            </p>
          )}
        </header>

        {/* Categories Navigation */}
        <section aria-labelledby="blog-categories-heading" className="mb-10">
          <h2 id="blog-categories-heading" className="sr-only">
            Blog Categories
          </h2>
          {allCategories.length > 0 && (
            <nav aria-label="Blog categories">
              <ul className="flex flex-wrap gap-3 md:gap-4">
                {allCategories.map((category) => {
                  const isActive = category.slug === categoryData?.slug;
                  return (
                    <li key={category.slug}>
                      <Link rel="preload" href={`/blogs/${category.slug}`}>
                        <span
                          className={`inline-block transition-all duration-300 py-2 px-5 md:px-7 rounded-full border shadow-sm cursor-pointer text-sm md:text-base ${
                            isActive
                              ? "bg-primary text-white border-primary"
                              : "bg-primary/5 hover:bg-primary hover:text-white text-gray-700 border-primary/10"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </section>

        {/* Blog List */}
        <section aria-labelledby="blog-list-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="blog-list-heading" className="text-2xl md:text-3xl font-semibold">
                Articles
              </h2>
              <p className="text-gray-600 mt-1">
                {hasBlogs
                  ? `${blogs.length} ${blogs.length === 1 ? "article" : "articles"} found`
                  : "No articles available"}
              </p>
            </div>
            <Link rel="preload" href="/blogs">
              <Button variant="outline">View All Blogs</Button>
            </Link>
          </div>

          {!hasBlogs ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">
                No articles found in this category.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Check back soon for new content.
              </p>
              <Link rel="preload" href="/blogs">
                <Button>Browse All Articles</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog: Blog, index) => (
                <BlogCard key={blog.slug || index} data={blog} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BlogCategoryPage;
