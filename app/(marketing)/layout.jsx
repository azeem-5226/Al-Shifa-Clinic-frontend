import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
function MarketingLayout({
  children
}) {
  return <div className="flex min-h-screen flex-col bg-white">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>;
}
export {
  MarketingLayout as default
};
