import { MetadataRoute } from "next";
import { DOMAIN_URL } from "@/constants/url";
import { fetchProjects, fetchBlogs, fetchCategories } from "@/lib/apis";
import logger from "@/lib/logger";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DOMAIN_URL;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn-with-us`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await fetchProjects({ limit: 1000 });
    if (Array.isArray(projects)) {
      projectPages = projects.map((project: any) => ({
        url: `${baseUrl}/projects/${project.project_id || project.slug}`,
        lastModified: project.updated_at
          ? new Date(project.updated_at)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    logger.error("Error fetching projects for sitemap:", error);
  }

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  let blogCategoryPages: MetadataRoute.Sitemap = [];

  try {
    const [blogs, categories] = await Promise.all([
      fetchBlogs(),
      fetchCategories(),
    ]);

    // Blog category pages
    if (Array.isArray(categories)) {
      blogCategoryPages = categories.map((category: any) => ({
        url: `${baseUrl}/blogs/${category.slug}`,
        lastModified: category.updated_at
          ? new Date(category.updated_at)
          : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }

    // Individual blog post pages
    if (Array.isArray(blogs)) {
      blogPages = blogs.map((blog: any) => {
        const primaryCategory =
          blog.categories?.[0]?.category?.slug || "uncategorized";
        return {
          url: `${baseUrl}/blogs/${primaryCategory}/${blog.slug}`,
          lastModified:
            blog.updated_at || blog.publish_date
              ? new Date(blog.updated_at || blog.publish_date)
              : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    logger.error("Error fetching blogs for sitemap:", error);
  }

  return [...staticPages, ...projectPages, ...blogCategoryPages, ...blogPages];
}
