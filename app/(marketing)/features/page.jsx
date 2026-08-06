"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
function FeaturesPage() {
  return <div className="pt-32 pb-20">
      {
    /* Hero */
  }
      <section className="text-center max-w-4xl mx-auto px-4 mb-20">
        <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6"
  >
          Everything you need to run a <span className="text-brand-blue">modern practice</span>
        </motion.h1>
        <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-lg md:text-xl text-text-secondary"
  >
          Discover how ClinicOS streamlines your workflow, from patient intake to financial reporting.
        </motion.p>
      </section>

      {
    /* Feature 1 */
  }
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex-1 space-y-6"
  >
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900">Comprehensive Patient Management</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Say goodbye to lost paper files. Maintain a complete, digital health record for every patient that you can access instantly.
              </p>
              <ul className="space-y-4">
                {["Digital medical history & past diagnoses", "Allergies and chronic conditions tracking", "Upload past lab reports and scans", "Quick search by name or mobile number"].map((item, i) => <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                    <span className="text-navy-900 font-medium">{item}</span>
                  </li>)}
              </ul>
            </motion.div>
            <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex-1 w-full relative"
  >
              <div className="aspect-[4/3] rounded-2xl bg-bg-app border border-border-subtle shadow-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1551076805-e166946e0e15?auto=format&fit=crop&q=80&w=1000" alt="Patient Management" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Feature 2 */
  }
      <section className="py-16 md:py-24 bg-bg-app overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex-1 space-y-6"
  >
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900">Lightning Fast Prescriptions</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Create beautiful, branded digital prescriptions in under 30 seconds. Stop worrying about handwriting legibility.
              </p>
              <ul className="space-y-4">
                {["Custom Rx templates for common conditions", "Auto-complete for medicines & dosages", "Print directly or send via WhatsApp/Email", "Automatically saves to patient history"].map((item, i) => <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0" />
                    <span className="text-navy-900 font-medium">{item}</span>
                  </li>)}
              </ul>
            </motion.div>
            <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex-1 w-full relative"
  >
              <div className="aspect-[4/3] rounded-2xl bg-white border border-border-subtle shadow-2xl overflow-hidden relative p-8">
                 <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=1000" alt="Prescriptions" className="w-full h-full object-cover rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {
    /* Feature 3 */
  }
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex-1 space-y-6"
  >
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900">Financial Reports & Billing</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Stay on top of your clinic's finances. Track daily earnings, manage pending dues, and generate detailed tax-ready reports.
              </p>
              <ul className="space-y-4">
                {["Track daily and monthly revenue", "Easily identify patients with pending balances", "Support for multiple payment methods", "Export data for your accountant"].map((item, i) => <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent-highlight shrink-0" />
                    <span className="text-navy-900 font-medium">{item}</span>
                  </li>)}
              </ul>
            </motion.div>
            <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex-1 w-full relative"
  >
              <div className="aspect-[4/3] rounded-2xl bg-bg-app border border-border-subtle shadow-2xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" alt="Finance Reports" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>;
}
export {
  FeaturesPage as default
};
