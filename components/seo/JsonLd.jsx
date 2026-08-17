/**
 * JsonLd — Injects JSON-LD structured data into the <head>.
 * Use in Server Components only (no "use client" needed).
 *
 * Usage:
 *   <JsonLd data={schema} />
 */

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Pre-built Schema Objects ──────────────────────────────────────────────────

/** Organization schema — place in root layout or homepage */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Al Shifa Clinic",
  url: "https://www.alshifaclinic.com",
  logo: "https://www.alshifaclinic.com/icon-512x512.png",
  description:
    "Al Shifa Clinic is an all-in-one clinic management software for doctors and healthcare professionals in India.",
  foundingDate: "2023",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Health Ave, Medical District",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  sameAs: [
    "https://twitter.com/alshifaclinic",
    "https://www.linkedin.com/company/alshifaclinic",
  ],
};

/** SoftwareApplication schema — for the main homepage */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Al Shifa Clinic",
  operatingSystem: "Web, Android, iOS",
  applicationCategory: "HealthApplication",
  offers: [
    {
      "@type": "Offer",
      name: "Basic",
      price: "0",
      priceCurrency: "INR",
      description: "Free plan for solo practitioners",
    },
    {
      "@type": "Offer",
      name: "Pro Clinic",
      price: "999",
      priceCurrency: "INR",
      description: "For busy clinics needing automation",
    },
    {
      "@type": "Offer",
      name: "Hospital",
      price: "2499",
      priceCurrency: "INR",
      description: "For large polyclinics and hospitals",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "500",
  },
};

/** FAQ Page schema — for the pricing page FAQ section */
export const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to install any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Al Shifa Clinic is entirely cloud-based. You can access it securely from any web browser on your computer, tablet, or smartphone.",
      },
    },
    {
      "@type": "Question",
      name: "Is my patient data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We use bank-grade encryption (256-bit AES) for all data both in transit and at rest. We are fully compliant with Indian healthcare data regulations.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade or downgrade my plan later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can change your plan at any time. If you upgrade, you'll be prorated for the remainder of your billing cycle.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer support if I get stuck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All plans include email support. Pro and Hospital plans include priority WhatsApp and phone support.",
      },
    },
  ],
};

/** WebPage schema factory — for per-page schemas */
export function webPageSchema({ title, description, url, breadcrumbs = [] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Al Shifa Clinic",
      url: "https://www.alshifaclinic.com",
    },
  };

  if (breadcrumbs.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return schema;
}
