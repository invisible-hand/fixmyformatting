import Script from "next/script";

const measurementId = "G-04L328CSP7";

/**
 * GA4 in cookieless mode.
 *
 * Consent Mode v2 defaults every storage type to "denied" and nothing ever
 * grants it, so gtag sends cookieless pings: no _ga cookie, no persistent
 * client id. That is deliberate — five of the ten locales this site serves are
 * EU languages, and cookieless collection needs no prior consent, so the site
 * stays free of a consent banner. Granting consent later would require a
 * banner first; do not flip these to "granted" on their own.
 *
 * The consent default must reach dataLayer before the config command. Keeping
 * both in one inline script is what guarantees that ordering, independent of
 * when the async gtag.js arrives.
 *
 * Trade-off to expect in the reports: user and session counts are modelled
 * rather than measured, since there is no identifier to deduplicate visits.
 */
export function GoogleAnalytics() {
  // Preview and local builds would otherwise pollute a property whose real
  // signal is currently a few dozen visitors a week.
  if (process.env.VERCEL_ENV !== "production") return null;
  return (
    <>
      <Script
        id="ga-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: [
            "window.dataLayer=window.dataLayer||[];",
            "function gtag(){dataLayer.push(arguments)}",
            "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});",
            "gtag('set','ads_data_redaction',true);",
            "gtag('js',new Date());",
            `gtag('config','${measurementId}');`,
          ].join(""),
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    </>
  );
}
