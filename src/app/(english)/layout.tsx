import type { Metadata } from "next";
import { DocumentLayout } from "@/components/document-layout";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fixmyformatting.com"),
  title: "Fix My Formatting — Free AI-Era Text Tools",
  description: "Free, fast, private tools to clean and convert text from ChatGPT, Claude, Gemini, and more.",
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocumentLayout lang="en">{children}</DocumentLayout>;
}
