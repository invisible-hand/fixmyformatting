export const siteUrl = "https://fixmyformatting.com";

export const organizationName = "Fix My Formatting";

type Faq = { question: string; answer: string };

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${siteUrl}${step.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function organizationSchema() {
  return { "@context": "https://schema.org", "@type": "Organization", name: organizationName, url: siteUrl };
}

/** JSON-LD payloads must never close the surrounding script tag. */
export function serializeSchema(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
