import Link from "next/link";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found — Al Shifa Clinic",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-border-subtle flex flex-col items-center">
        <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-8">
          <Stethoscope className="w-10 h-10 text-brand-blue" />
        </div>

        <h1 className="text-6xl font-black text-navy-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-navy-900 mb-3">Page not found</h2>
        <p className="text-text-secondary mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new address.
        </p>

        <Button
          className="w-full h-14 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-semibold shadow-lg shadow-brand-blue/25"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

