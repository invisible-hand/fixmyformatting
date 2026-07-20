import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentLayout } from "@/components/document-layout";
import { isLocale, localeCodes } from "@/lib/i18n";
import "../../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fixmyformatting.com"),
};

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DocumentLayout lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>{children}</DocumentLayout>;
}
