"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Calendar, Stethoscope, Users, Cloud, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/marketing/feature-card";
import { PricingCard } from "@/components/marketing/pricing-card";
function HomeClient() {
  return <div className="flex flex-col min-h-screen">
      {
    /* Hero Section */
  }
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-bg-app">
        {
    /* Background Gradients */
  }
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-navy-900/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-navy-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-subtle text-navy-700 text-sm font-semibold mb-8 shadow-sm"
  >
              <span className="flex h-2 w-2 rounded-full bg-success" />
              Trusted by 500+ clinics across India
            </motion.div>

            <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="text-5xl md:text-7xl font-extrabold text-navy-900 tracking-tight leading-tight mb-6"
  >
              Run your entire clinic from one <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">modern platform</span>
            </motion.h1>

            <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto"
  >
              Streamline appointments, digital prescriptions, patient records, and billing with Al Shifa Clinic. The all-in-one software built specifically for modern doctors.
            </motion.p>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="flex flex-col sm:flex-row items-center justify-center gap-4"
  >
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full text-lg shadow-lg shadow-brand-blue/25" asChild>
                <Link href="/login">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-lg border-2 border-border-subtle hover:bg-slate-50 text-navy-900">
                Book a Demo
              </Button>
            </motion.div>
          </div>

          {
    /* Hero Image Mockup */
  }
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.5 }}
    className="mt-20 relative max-w-5xl mx-auto"
  >
            <div className="rounded-2xl border border-white/20 bg-white/50 backdrop-blur-xl p-2 shadow-2xl">
              <div className="rounded-xl overflow-hidden bg-white border border-border-subtle relative aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
                <img
    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
    alt="Al Shifa Clinic Dashboard — Clinic Management Software"
    className="w-full h-full object-cover object-top opacity-90"
  />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
              </div>
            </div>

            {
    /* Floating Stat Badge */
  }
            <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, type: "spring", bounce: 0.5 }}
    className="absolute -right-6 -bottom-6 md:right-10 md:-bottom-10 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-border-subtle"
  >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <IndianRupee className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Earned this month</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-navy-900">₹2,45,000</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {
    /* Logos Section */
  }
      <section className="py-12 border-b border-border-subtle bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by clinics and hospitals across India</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            <span className="text-2xl font-bold text-slate-700">Apollo</span>
            <span className="text-2xl font-bold text-slate-700">Fortis</span>
            <span className="text-2xl font-bold text-slate-700">Max Healthcare</span>
            <span className="text-2xl font-bold text-slate-700">Care Hospitals</span>
            <span className="text-2xl font-bold text-slate-700">Manipal</span>
          </div>
        </div>
      </section>

      {
    /* Features Grid */
  }
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-6">Everything you need to manage your practice</h2>
            <p className="text-lg text-text-secondary">Stop switching between different tools. Al Shifa Clinic brings your patients, appointments, prescriptions, and billing into one seamless workflow.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
    delay={0.1}
    icon={<Users className="w-6 h-6" />}
    title="Patient Records (EMR)"
    description="Maintain detailed digital patient histories, vital signs, and past visits accessible instantly from anywhere."
  />
            <FeatureCard
    delay={0.2}
    icon={<Stethoscope className="w-6 h-6" />}
    title="Digital Prescriptions"
    description="Generate professional, branded Rx in seconds. Print or share directly with patients via WhatsApp or email."
  />
            <FeatureCard
    delay={0.3}
    icon={<Calendar className="w-6 h-6" />}
    title="Smart Appointments"
    description="Reduce no-shows with automated WhatsApp and SMS reminders for upcoming consultations."
  />
            <FeatureCard
    delay={0.4}
    icon={<Activity className="w-6 h-6" />}
    title="Multi-Doctor Support"
    description="Add multiple doctors and staff with role-based access control. Perfect for polyclinics."
  />
            <FeatureCard
    delay={0.5}
    icon={<IndianRupee className="w-6 h-6" />}
    title="Earnings & Reports"
    description="Track daily revenue, pending dues, and generate comprehensive financial reports with one click."
  />
            <FeatureCard
    delay={0.6}
    icon={<Cloud className="w-6 h-6" />}
    title="Secure Cloud Storage"
    description="Bank-grade encryption ensures your clinical data is safe, backed up daily, and HIPAA compliant."
  />
          </div>
        </div>
      </section>

      {
    /* How it works */
  }
      <section className="py-24 bg-bg-app border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-6">How Al Shifa Clinic Works</h2>
            <p className="text-lg text-text-secondary">A simple 3-step workflow designed to save you hours of admin work every week.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8 relative">
            {
    /* Connecting Line */
  }
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-brand-blue/20 -translate-y-1/2 z-0" />

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative z-10 flex flex-col items-center text-center max-w-[280px]"
  >
              <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-border-subtle flex items-center justify-center mb-6 text-brand-blue text-2xl font-black">1</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Add Patient</h3>
              <p className="text-text-secondary">Register a new patient or look up an existing record in seconds using their mobile number.</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="relative z-10 flex flex-col items-center text-center max-w-[280px]"
  >
              <div className="w-20 h-20 rounded-2xl bg-brand-blue shadow-xl shadow-brand-blue/30 border border-brand-blue flex items-center justify-center mb-6 text-white text-2xl font-black">2</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Record & Prescribe</h3>
              <p className="text-text-secondary">Log vitals, write clinical notes, and generate a digital prescription easily.</p>
            </motion.div>

            <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4 }}
    className="relative z-10 flex flex-col items-center text-center max-w-[280px]"
  >
              <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-border-subtle flex items-center justify-center mb-6 text-brand-blue text-2xl font-black">3</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Track Earnings</h3>
              <p className="text-text-secondary">Collect fees, mark dues, and view real-time revenue reports on your dashboard.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Stats Band */
  }
      <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">10M+</div>
              <p className="text-slate-300 font-medium">Patients Managed</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">5,000+</div>
              <p className="text-slate-300 font-medium">Active Doctors</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">99.9%</div>
              <p className="text-slate-300 font-medium">Platform Uptime</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">24/7</div>
              <p className="text-slate-300 font-medium">Priority Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* Pricing Preview */
  }
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-6">Simple, transparent pricing</h2>
            <p className="text-lg text-text-secondary">No hidden fees, no surprise charges. Start for free, upgrade when you need to.</p>
          </div>

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
    price="₹999"
    period="/month"
    isPopular={true}
    features={["Unlimited Patients", "Custom Rx Templates", "WhatsApp Reminders", "Multi-Doctor (Up to 3)", "Financial Reports"]}
    delay={0.2}
  />
            <PricingCard
    name="Hospital"
    description="For large polyclinics and hospitals."
    price="₹2,499"
    period="/month"
    features={["Everything in Pro", "Unlimited Doctors & Staff", "Advanced Analytics", "Dedicated Account Manager", "API Access"]}
    ctaText="Contact Sales"
    delay={0.3}
  />
          </div>
          <div className="text-center mt-12">
            <Link href="/pricing" className="text-brand-blue font-semibold hover:underline inline-flex items-center gap-2">
              See full pricing comparison <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {
    /* Final CTA */
  }
      <section className="py-20 relative overflow-hidden bg-brand-blue text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to modernize your clinic?</h2>
          <p className="text-xl text-blue-100 mb-10">Join thousands of doctors who trust Al Shifa Clinic to run their practice efficiently.</p>
          <Button size="lg" className="h-14 px-10 bg-white text-brand-blue hover:bg-slate-100 rounded-full text-lg font-bold shadow-xl" asChild>
            <Link href="/login">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>;
}
export { HomeClient as default };
