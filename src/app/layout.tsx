import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fixmyformatting.com"),
  title: {
    default: "Fix My Formatting — Free AI-Era Text Tools",
    template: "%s | Fix My Formatting",
  },
  description: "Free, fast, private tools to clean and convert text from ChatGPT, Claude, Gemini, and more.",
  alternates: { canonical: "https://fixmyformatting.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
