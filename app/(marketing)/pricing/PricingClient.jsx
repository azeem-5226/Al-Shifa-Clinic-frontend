"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PricingCard } from "@/components/marketing/pricing-card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need to install any software?",
    answer: "No, Al Shifa Clinic is entirely cloud-based. You can access it securely from any web browser on your computer, tablet, or smartphone."
  },
  {
    question: "Is my patient data secure?",
    answer: "Absolutely. We use bank-grade encryption (256-bit AES) for all data both in transit and at rest. We are fully compliant with Indian healthcare data regulations."
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can change your plan at any time. If you upgrade, you'll be prorated for the remainder of your billing cycle."
  },
  {
    question: "Do you offer support if I get stuck?",
    answer: "Yes! All plans include email support. Pro and Hospital plans include priority WhatsApp and phone support."
  }
];

function PricingClient() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return <div className="pt-32 pb-20">
      <section className="text-center max-w-4xl mx-auto px-4 mb-16">
        <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6"
  >
          Simple, transparent <span className="text-brand-blue">pricing</span>
        </motion.h1>
        <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-lg md:text-xl text-text-secondary mb-10"
  >
          Choose the plan that fits your practice. Upgrade anytime as you grow.
        </motion.p>
        
        {/* Toggle */}
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="flex items-center justify-center gap-4"
  >
          <span className={`text-sm font-semibold ${!isYearly ? "text-navy-900" : "text-text-secondary"}`}>Monthly</span>
          <button
    onClick={() => setIsYearly(!isYearly)}
    className="w-14 h-8 bg-brand-blue rounded-full p-1 flex items-center transition-colors relative"
    aria-label="Toggle yearly billing"
  >
            <motion.div
    animate={{ x: isYearly ? 24 : 0 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    className="w-6 h-6 bg-white rounded-full shadow-sm"
  />
          </button>
          <span className={`text-sm font-semibold flex items-center gap-2 ${isYearly ? "text-navy-900" : "text-text-secondary"}`}>
            Yearly <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
          </span>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
    name="Basic"
    description="For solo practitioners starting out."
    price="Free"
    period="forever"
    features={["Up to 100 patients/month", "Basic Prescriptions", "Daily Earnings View", "Email Support"]}
    ctaText="Get Started"
    delay={0.1}
  />
          <PricingCard
    name="Pro Clinic"
    description="For busy clinics needing automation."
    price={isYearly ? "₹799" : "₹999"}
    period="/month"
    isPopular={true}
    features={["Unlimited Patients", "Custom Rx Templates", "WhatsApp Reminders", "Multi-Doctor (Up to 3)", "Financial Reports"]}
    delay={0.2}
  />
          <PricingCard
    name="Hospital"
    description="For large polyclinics and hospitals."
    price={isYearly ? "₹1,999" : "₹2,499"}
    period="/month"
    features={["Everything in Pro", "Unlimited Doctors & Staff", "Advanced Analytics", "Dedicated Account Manager", "API Access"]}
    ctaText="Contact Sales"
    delay={0.3}
  />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-bg-app py-24 border-y border-border-subtle">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Have another question? Reach out to us.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => <div key={index} className="bg-white rounded-2xl border border-border-subtle overflow-hidden">
                <button
    onClick={() => setOpenFaq(openFaq === index ? null : index)}
    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
    aria-expanded={openFaq === index}
  >
                  <span className="font-semibold text-navy-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="px-6 pb-5 text-text-secondary leading-relaxed"
  >
                      {faq.answer}
                    </motion.div>}
                </AnimatePresence>
              </div>)}
          </div>
        </div>
      </section>
    </div>;
}
export { PricingClient as default };
