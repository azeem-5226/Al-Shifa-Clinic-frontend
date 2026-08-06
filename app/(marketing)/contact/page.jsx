"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  return <div className="pt-32 pb-20">
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6"
  >
            Let's talk about your <span className="text-brand-blue">clinic.</span>
          </motion.h1>
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-lg text-text-secondary"
  >
            Have questions about Al Shifa Clinic? Our team is here to help you modernize your practice.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {
    /* Contact Info */
  }
          <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    className="space-y-8"
  >
            <div className="bg-bg-app rounded-3xl p-8 border border-border-subtle">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-border-subtle shrink-0">
                    <Mail className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Email Us</p>
                    <p className="text-text-secondary">support@alshifaclinic.com</p>
                    <p className="text-text-secondary">sales@alshifaclinic.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-border-subtle shrink-0">
                    <Phone className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Call Us</p>
                    <p className="text-text-secondary">+91 98765 43210</p>
                    <p className="text-text-secondary text-sm">Mon-Fri, 9am-6pm IST</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-border-subtle shrink-0">
                    <MapPin className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Headquarters</p>
                    <p className="text-text-secondary">123 Health Ave, Medical District,<br />New Delhi, India 110001</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {
    /* Map Placeholder */
  }
            <div className="h-64 bg-slate-200 rounded-3xl border border-border-subtle overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-50 grayscale mix-blend-multiply" />
              <div className="relative z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm font-medium text-navy-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue" /> View on Google Maps
              </div>
            </div>
          </motion.div>

          {
    /* Contact Form */
  }
          <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(18,22,43,0.08)] border border-border-subtle relative overflow-hidden">
              <AnimatePresence>
                {isSuccess ? <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 z-10"
  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                      <CheckCircle2 className="w-20 h-20 text-success mb-6 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                    <p className="text-text-secondary mb-8">Thank you for reaching out. A member of our team will get back to you within 24 hours.</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">Send another message</Button>
                  </motion.div> : null}
              </AnimatePresence>

              <h3 className="text-2xl font-bold text-navy-900 mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy-900">First Name</label>
                    <Input required className="h-12 bg-bg-app rounded-xl border-transparent focus:border-brand-blue focus:bg-white transition-colors" placeholder="Dr. Rahul" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy-900">Last Name</label>
                    <Input required className="h-12 bg-bg-app rounded-xl border-transparent focus:border-brand-blue focus:bg-white transition-colors" placeholder="Verma" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy-900">Email Address</label>
                  <Input type="email" required className="h-12 bg-bg-app rounded-xl border-transparent focus:border-brand-blue focus:bg-white transition-colors" placeholder="rahul@clinic.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy-900">Clinic Name</label>
                  <Input required className="h-12 bg-bg-app rounded-xl border-transparent focus:border-brand-blue focus:bg-white transition-colors" placeholder="Verma Polyclinic" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy-900">How can we help?</label>
                  <textarea
    required
    rows={4}
    className="w-full p-4 bg-bg-app rounded-xl border border-transparent focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:bg-white transition-colors resize-none text-sm outline-none"
    placeholder="Tell us about your requirements..."
  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-semibold shadow-lg shadow-brand-blue/25">
                  {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
}
export {
  ContactPage as default
};
