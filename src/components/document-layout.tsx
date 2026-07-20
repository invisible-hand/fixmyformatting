import { Analytics } from "@vercel/analytics/next";

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
      </body>
    </html>
  );
}
