/**
 * GoogleAnalytics.jsx
 * ─────────────────────────────────────────────────────────────
 * Google Analytics 4 — Measurement ID: G-RBRQQYQRPH
 * Automatically injected in app/layout.jsx
 */

import Script from "next/script";

const GA_ID = "G-RBRQQYQRPH";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
        async
      />

      {/* Initialize GA4 */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
