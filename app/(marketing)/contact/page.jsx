// ─── Server Component ─────────────────────────────────────────────────────────
import ContactClient from "./ContactClient";
import JsonLd, { webPageSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Contact Us — Get in Touch with Al Shifa Clinic",
  description:
    "Contact Al Shifa Clinic for support, sales, or demo requests. Reach us at support@alshifaclinic.com or +91 98765 43210. We're here Mon–Fri, 9am–6pm IST.",
  keywords: [
    "contact Al Shifa Clinic",
    "clinic software support",
    "book a demo clinic software",
    "Al Shifa Clinic help",
  ],
  alternates: {
    canonical: "https://www.alshifaclinic.com/contact",
  },
  openGraph: {
    title: "Contact Us — Al Shifa Clinic",
    description:
      "Have questions about Al Shifa Clinic? Contact our team for support, sales, or to book a product demo.",
    url: "https://www.alshifaclinic.com/contact",
  },
};

export default function ContactPage() {
  const schema = webPageSchema({
    title: "Contact Al Shifa Clinic — Get in Touch",
    description:
      "Contact Al Shifa Clinic for support, sales inquiries, or a product demo.",
    url: "https://www.alshifaclinic.com/contact",
    breadcrumbs: [
      { name: "Home", url: "https://www.alshifaclinic.com" },
      { name: "Contact", url: "https://www.alshifaclinic.com/contact" },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <ContactClient />
    </>
  );
}
