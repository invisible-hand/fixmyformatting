import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "./google-analytics";

export function DocumentLayout({
  children,
  lang = "en",
  dir = "ltr",
}: Readonly<{
  children: React.ReactNode;
  lang?: string;
  dir?: "ltr" | "rtl";
}>) {
  return (
    <html lang={lang} dir={dir}>
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
