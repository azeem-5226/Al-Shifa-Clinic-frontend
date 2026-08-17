// ─── Server Component ─────────────────────────────────────────────────────────
import PricingClient from "./PricingClient";
import JsonLd, { webPageSchema, pricingFaqSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Pricing — Free, Pro & Hospital Plans for Clinics",
  description:
    "Al Shifa Clinic pricing: Free plan for solo doctors, Pro Clinic at ₹999/month, Hospital plan at ₹2,499/month. No hidden fees. Start free, upgrade anytime.",
  keywords: [
    "clinic management software pricing",
    "doctor software price India",
    "EMR software cost",
    "clinic billing software plans",
    "Al Shifa Clinic pricing",
    "free clinic software India",
  ],
  alternates: {
    canonical: "https://al-shifa-clinic-frontend.vercel.app/pricing",
  },
  openGraph: {
    title: "Pricing — Al Shifa Clinic",
    description:
      "Simple, transparent pricing. Free plan for solo doctors. Pro at ₹999/month. Hospital at ₹2,499/month. No hidden fees.",
    url: "https://al-shifa-clinic-frontend.vercel.app/pricing",
  },
};

export default function PricingPage() {
  const pageSchema = webPageSchema({
    title: "Al Shifa Clinic Pricing — Free, Pro & Hospital Plans",
    description:
      "Transparent pricing for Al Shifa Clinic. Free plan, Pro at ₹999/month, Hospital at ₹2,499/month.",
    url: "https://al-shifa-clinic-frontend.vercel.app/pricing",
    breadcrumbs: [
      { name: "Home", url: "https://al-shifa-clinic-frontend.vercel.app" },
      { name: "Pricing", url: "https://al-shifa-clinic-frontend.vercel.app/pricing" },
    ],
  });

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={pricingFaqSchema} />
      <PricingClient />
    </>
  );
}
