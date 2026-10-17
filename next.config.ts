import type { NextConfig } from "next";
import { localeCodes } from "./src/lib/i18n/locales";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: localeCodes.flatMap((locale) => [
        { source: `/${locale}`, destination: `/localized-content/${locale}` },
        { source: `/${locale}/:path*`, destination: `/localized-content/${locale}/:path*` },
      ]),
    };
  },
  async headers() {
    return [
      {
        // Cloudflare-style content signals: search, AI answers and training are all welcome.
        source: "/:path*",
        headers: [{ key: "x-content-signal", value: "search=yes, ai-input=yes, ai-train=yes" }],
      },
      {
        source: "/:path*",
        has: [{ type: "query", key: "embed", value: "1" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
    ];
  },
};

export default nextConfig;
