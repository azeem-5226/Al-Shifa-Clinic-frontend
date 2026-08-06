"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const links = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];
function MarketingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <header
    className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-border-subtle shadow-sm py-3" : "bg-transparent py-5"}`}
  >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className={`p-2 rounded-xl transition-colors ${scrolled ? "bg-brand-blue text-white" : "bg-white/10 text-brand-blue"}`}>
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? "text-navy-900" : "text-brand-blue"}`}>
              ClinicOS
            </span>
          </Link>

          {
    /* Desktop Nav */
  }
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
    const isActive = pathname === link.href;
    return <Link
      key={link.name}
      href={link.href}
      className={`text-sm font-medium relative group ${scrolled ? "text-text-secondary hover:text-navy-900" : "text-slate-600 hover:text-brand-blue"} ${isActive ? scrolled ? "text-navy-900" : "text-brand-blue" : ""}`}
    >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>;
  })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className={`text-sm font-medium hover:underline ${scrolled ? "text-navy-900" : "text-slate-700"}`}>
              Log in
            </Link>
            <Button className="bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full px-6" asChild>
              <Link href="/login">Start Free Trial</Link>
            </Button>
          </div>

          {
    /* Mobile Menu Toggle */
  }
          <button
    className={`md:hidden p-2 rounded-md ${scrolled ? "text-navy-900" : "text-brand-blue"}`}
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {
    /* Mobile Nav */
  }
      <AnimatePresence>
        {mobileMenuOpen && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="md:hidden bg-white border-b border-border-subtle"
  >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {links.map((link) => <Link
    key={link.name}
    href={link.href}
    className={`text-base font-medium p-2 rounded-md ${pathname === link.href ? "bg-bg-app text-brand-blue" : "text-text-primary hover:bg-bg-app"}`}
    onClick={() => setMobileMenuOpen(false)}
  >
                  {link.name}
                </Link>)}
              <hr className="border-border-subtle" />
              <Link
    href="/login"
    className="text-base font-medium p-2 text-text-primary"
    onClick={() => setMobileMenuOpen(false)}
  >
                Log in
              </Link>
              <Button className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full mt-2" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}
export {
  MarketingNavbar
};
