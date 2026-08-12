import Script from "next/script";

const measurementId = "G-04L328CSP7";

/**
 * Standard GA4 measurement (gtag), aligned with the rest of the site suite.
 *
 * This previously ran in cookieless Consent Mode (everything denied, no
 * banner), which kept EU locales consent-free but left user/session counts
 * modelled down to zero at this site's traffic level. Owner decision
 * 2026-08-12: standard measurement, no consent banner.
 */
export function GoogleAnalytics() {
  // Preview and local builds would otherwise pollute a property whose real
  // signal is currently a few dozen visitors a week.
  if (process.env.VERCEL_ENV !== "production") return null;
  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: [
            "window.dataLayer=window.dataLayer||[];",
            "function gtag(){dataLayer.push(arguments)}",
            "gtag('js',new Date());",
            `gtag('config','${measurementId}');`,
          ].join(""),
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    </>
  );
}
