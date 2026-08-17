// ─── Server Component ─────────────────────────────────────────────────────────
import AboutClient from "./AboutClient";
import JsonLd, { webPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About Us — Built by Doctors, for Doctors",
  description:
    "Learn about the team behind Al Shifa Clinic. We started as doctors frustrated with outdated medical software. Our mission: give healthcare professionals modern, effortless tools.",
  keywords: [
    "about Al Shifa Clinic",
    "clinic software team",
    "healthcare technology India",
    "doctor software founders",
  ],
  alternates: {
    canonical: "https://al-shifa-clinic-frontend.vercel.app/about",
  },
  openGraph: {
    title: "About Us — Al Shifa Clinic",
    description:
      "Built by doctors, for doctors. Learn the story behind Al Shifa Clinic and the team driving modern healthcare in India.",
    url: "https://al-shifa-clinic-frontend.vercel.app/about",
  },
};

export default function AboutPage() {
  const schema = webPageSchema({
    title: "About Al Shifa Clinic — Built by Doctors, for Doctors",
    description:
      "Learn about the team behind Al Shifa Clinic — modern clinic management software for Indian doctors.",
    url: "https://al-shifa-clinic-frontend.vercel.app/about",
    breadcrumbs: [
      { name: "Home", url: "https://al-shifa-clinic-frontend.vercel.app" },
      { name: "About", url: "https://al-shifa-clinic-frontend.vercel.app/about" },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <AboutClient />
    </>
  );
}
