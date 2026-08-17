// ─── Server Component ─────────────────────────────────────────────────────────
import FeaturesClient from "./FeaturesClient";
import JsonLd, { webPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Features — Patient Records, Prescriptions, Billing & More",
  description:
    "Explore all features of Al Shifa Clinic: digital patient records (EMR), lightning-fast prescriptions, smart appointment scheduling, and real-time financial reports. Built for Indian doctors.",
  keywords: [
    "clinic software features",
    "EMR software features India",
    "digital prescription system",
    "patient record management",
    "clinic billing features",
    "appointment management",
  ],
  alternates: {
    canonical: "https://www.alshifaclinic.com/features",
  },
  openGraph: {
    title: "Features — Al Shifa Clinic",
    description:
      "Everything you need to run a modern practice. Patient records, prescriptions, appointments, billing — all in one platform.",
    url: "https://www.alshifaclinic.com/features",
  },
};

export default function FeaturesPage() {
  const schema = webPageSchema({
    title: "Al Shifa Clinic Features — Patient Records, Prescriptions & Billing",
    description:
      "Explore all features of Al Shifa Clinic: EMR, digital prescriptions, smart scheduling, and financial reports.",
    url: "https://www.alshifaclinic.com/features",
    breadcrumbs: [
      { name: "Home", url: "https://www.alshifaclinic.com" },
      { name: "Features", url: "https://www.alshifaclinic.com/features" },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <FeaturesClient />
    </>
  );
}
