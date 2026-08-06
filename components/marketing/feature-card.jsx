"use client";
import { motion } from "framer-motion";
function FeatureCard({ title, description, icon, delay = 0 }) {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -8, transition: { duration: 0.2, delay: 0 } }}
    className="bg-white p-8 rounded-2xl shadow-[0_8px_28px_rgba(18,22,43,0.04)] border border-border-subtle hover:shadow-[0_20px_40px_rgba(18,22,43,0.08)] transition-shadow duration-300 group"
  >
      <div className="w-14 h-14 rounded-xl bg-bg-app flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">
        {description}
      </p>
    </motion.div>;
}
export {
  FeatureCard
};
