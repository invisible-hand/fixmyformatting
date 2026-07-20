import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/share", "/localized-content/"] },
    ],
    sitemap: "https://fixmyformatting.com/sitemap.xml",
  };
}
