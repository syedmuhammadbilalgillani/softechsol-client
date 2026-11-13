import { MetadataRoute } from "next";
import { DOMAIN_URL } from "@/constants/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/generated/*",
        ],
      },
    ],
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}

