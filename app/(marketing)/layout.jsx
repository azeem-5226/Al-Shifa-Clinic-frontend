import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import JsonLd, { organizationSchema, softwareApplicationSchema } from "@/components/seo/JsonLd";

export default function MarketingLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}

