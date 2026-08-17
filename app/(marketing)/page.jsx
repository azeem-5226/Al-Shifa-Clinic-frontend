// ─── Server Component ─────────────────────────────────────────────────────────
// This file exports metadata for SEO and renders the client component.

import HomeClient from "./HomeClient";
import JsonLd, { webPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Al Shifa Clinic — Modern Clinic Management Software for Doctors",
  description:
    "Al Shifa Clinic is an all-in-one clinic management software for Indian doctors. Manage patients, digital prescriptions, appointments, and billing — all from one platform. Trusted by 500+ clinics.",
  keywords: [
    "clinic management software India",
    "doctor software",
    "patient management system",
    "digital prescription India",
    "online clinic management",
    "Al Shifa Clinic",
  ],
  alternates: {
    canonical: "https://www.alshifaclinic.com",
  },
  openGraph: {
    title: "Al Shifa Clinic — Modern Clinic Management Software for Doctors",
    description:
      "Run your entire clinic from one modern platform. Manage patients, prescriptions, appointments & billing. Trusted by 500+ clinics across India.",
    url: "https://www.alshifaclinic.com",
    type: "website",
  },
};

export default function HomePage() {
  const schema = webPageSchema({
    title: "Al Shifa Clinic — Modern Clinic Management Software for Doctors",
    description:
      "Al Shifa Clinic is an all-in-one clinic management software for Indian doctors.",
    url: "https://www.alshifaclinic.com",
    breadcrumbs: [{ name: "Home", url: "https://www.alshifaclinic.com" }],
  });

  return (
    <>
      <JsonLd data={schema} />
      <HomeClient />
    </>
  );
}
