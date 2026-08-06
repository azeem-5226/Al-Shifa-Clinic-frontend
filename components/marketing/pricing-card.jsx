"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function PricingCard({
  name,
  description,
  price,
  period,
  features,
  isPopular = false,
  ctaText = "Start Free Trial",
  delay = 0
}) {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`relative bg-white rounded-3xl p-8 shadow-[0_8px_28px_rgba(18,22,43,0.06)] border ${isPopular ? "border-brand-blue ring-1 ring-brand-blue" : "border-border-subtle"} flex flex-col h-full`}
  >
      {isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
          Most Popular
        </div>}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-navy-900 mb-2">{name}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>

      <div className="mb-8 flex items-end gap-1">
        <span className="text-4xl font-extrabold text-navy-900">{price}</span>
        {price !== "Custom" && <span className="text-text-secondary font-medium mb-1">{period}</span>}
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => <li key={i} className="flex items-start gap-3">
            <div className="shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
              <Check className="w-3.5 h-3.5 text-brand-blue" />
            </div>
            <span className="text-text-primary text-sm leading-relaxed">{feature}</span>
          </li>)}
      </ul>

      <Button
    className={`w-full py-6 rounded-xl font-semibold text-base ${isPopular ? "bg-brand-blue hover:bg-brand-blue-hover text-white" : "bg-bg-app hover:bg-slate-200 text-navy-900"}`}
    asChild
  >
        <Link href="/login">{ctaText}</Link>
      </Button>
    </motion.div>;
}
export {
  PricingCard
};
