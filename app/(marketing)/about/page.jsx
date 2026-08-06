"use client";
import { motion } from "framer-motion";
const team = [
  { name: "Dr. Naeem Akhtar", role: "Chief Physician & Founder", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500" },
  { name: "Aisha Sharma", role: "Head of Product", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500" },
  { name: "Rahul Verma", role: "Lead Engineer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500" },
  { name: "Dr. Priya Patel", role: "Medical Advisor", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500" }
];
function AboutPage() {
  return <div className="pt-32 pb-20">
      <section className="container mx-auto px-4 max-w-4xl text-center mb-20">
        <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6"
  >
          Built by doctors, for <span className="text-brand-blue">doctors.</span>
        </motion.h1>
        <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-lg md:text-xl text-text-secondary leading-relaxed"
  >
          We started ClinicOS because we were frustrated with clunky, outdated medical software. 
          Our mission is to give healthcare professionals modern tools that get out of the way, 
          so they can focus on what matters most: patient care.
        </motion.p>
      </section>

      <section className="py-20 bg-bg-app">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Meet the Team</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">The medical and technical minds behind ClinicOS.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-border-subtle"
  >
                <div className="aspect-square overflow-hidden">
                  <img
    src={member.image}
    alt={member.name}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.name}</h3>
                  <p className="text-blue-200 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.role}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
}
export {
  AboutPage as default
};
