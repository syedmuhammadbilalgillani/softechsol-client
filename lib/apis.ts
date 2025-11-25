import { unstable_cache } from "next/cache";
import logger from "./logger";
import axios from "axios";
import prisma from "./prisma";

// ——— Config ————————————————————————————————————————————————
export const REVALIDATE_SECONDS = 100;

// ——— Helpers ————————————————————————————————————————————————
const num = (v?: number) => (typeof v === "number" ? v : undefined);
const str = (v?: string) => (typeof v === "string" && v.trim() ? v : undefined);

const buildParams = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Record<string, string | number>;

async function safeGet<T>(
  url: string,
  params?: Record<string, any>,
  label?: string,
  token?: string
): Promise<T | null> {
  try {
    logger.debug(url, "url");
    logger.debug(params, "params");
    logger.debug(label, "label");
    logger.debug(token, "token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      params,
      ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
    logger.info(res, label);
    return res?.data ?? null;
  } catch (error) {
    logger.error(error, `${label} failed`);
    return null;
  }
}

export const fetchTeams = unstable_cache(
  async () =>
    await prisma.team.findMany({
      include: {
        featured_image: true,
      },
    }),
  ["teams"],
  { revalidate: REVALIDATE_SECONDS, tags: ["teams"] }
);

export const fetchCategoriesWithServices = unstable_cache(
  async () =>
    await prisma.serviceCategory.findMany({
      include: {
        services: true,
      },
    }),
  ["categories-with-services"],
  { revalidate: REVALIDATE_SECONDS, tags: ["categories-with-services"] }
);

export const fetchProjects = unstable_cache(
  async () =>
    await prisma.project.findMany({
      include: {
        images: {
          include: {
            image: true,
          },
        },
      },
    }),
  ["projects-list"],
  { revalidate: REVALIDATE_SECONDS, tags: ["projects-list"] }
);

export const fetchCategories = unstable_cache(
  async () => await prisma.blogCategory.findMany(),
  ["categories"],
  { revalidate: REVALIDATE_SECONDS, tags: ["categories"] }
);
export const fetchBlogs = unstable_cache(
  async () =>
    await prisma.blog.findMany({
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featured_image: {
          select: {
            id: true,
            url: true,
            altText: true,
            publicId: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        created_at: "desc",
      },
    }),
  ["blogs"],
  { revalidate: REVALIDATE_SECONDS, tags: ["blogs"] }
);
export const fetchBlogsByCategory = unstable_cache(
  async (categorySlug: string) => {
    try {
      return await prisma.blog.findMany({
        select: {
          slug: true,
          title: true,
          excerpt: true,
          featured_image: {
            select: {
              id: true,
              url: true,
              altText: true,
              publicId: true,
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
          publish_date: true,
          created_at: true,
        },
        where: {
          status: "PUBLISHED",
          categories: {
            some: {
              category: {
                slug: categorySlug,
              },
            },
          },
        },
        orderBy: {
          publish_date: "desc",
        },
      });
    } catch (error) {
      logger.error(error, `Error fetching blogs for category: ${categorySlug}`);
      return [];
    }
  },
  (categorySlug) => [`blogs-category-${categorySlug}`],
  { revalidate: REVALIDATE_SECONDS, tags: ["blogs"] }
);

export const fetchBlogBySlug = unstable_cache(
  async (categorySlug: string, blogSlug: string) => {
    try {
      return await prisma.blog.findFirst({
        where: {
          slug: blogSlug,
          status: "PUBLISHED",
          categories: {
            some: {
              category: {
                slug: categorySlug,
              },
            },
          },
        },
        include: {
          featured_image: true,
          og_image: true,
          author: {
            select: {
              first_name: true,
              last_name: true,
              username: true,
              avatar: true,
            },
          },
          categories: {
            include: {
              category: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      logger.error(error, `Error fetching blog: ${categorySlug}/${blogSlug}`);
      return null;
    }
  },
  (categorySlug, blogSlug) => [`blog-${categorySlug}-${blogSlug}`],
  { revalidate: REVALIDATE_SECONDS, tags: ["blogs"] }
);

export const fetchCategoryBySlug = unstable_cache(
  async (categorySlug: string) => {
    try {
      return await prisma.blogCategory.findUnique({
        where: {
          slug: categorySlug,
        },
      });
    } catch (error) {
      logger.error(error, `Error fetching category: ${categorySlug}`);
      return null;
    }
  },
  (categorySlug) => [`category-${categorySlug}`],
  { revalidate: REVALIDATE_SECONDS, tags: ["categories"] }
);
export const fetchJobCategories = unstable_cache(
  async () =>
    await prisma.jobCategory.findMany({
      select: {
        name: true,
        slug: true,
      },
    }),
  ["job-categories"],
  { revalidate: REVALIDATE_SECONDS, tags: ["job-categories"] }
);
export const fetchJobs = (slug?: string) => {
  return unstable_cache(
    async () => {
      const whereClause: any = {};

      if (slug) {
        whereClause.categories = {
          some: {
            category: {
              slug: slug,
            },
          },
        };
      }

      return await prisma.job.findMany({
        where: whereClause,
        select: {
          title: true,
          description: true,
          slug: true,
          job_type: true,
          categories: {
            select: {
              category: {
                select: {
                  slug: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    },
    ["jobs", slug ? `category-${slug}` : "all"],
    { revalidate: REVALIDATE_SECONDS, tags: ["jobs"] }
  )();
};
