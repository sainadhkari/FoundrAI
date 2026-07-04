import { motion } from "framer-motion";
import { Network, LineChart, Cpu, Coins, Glasses, Rocket, Search, Box, Lock, Briefcase } from "lucide-react";

const agents = [
  { name: "Market Opportunity", icon: Network, desc: "Evaluates TAM, SAM, SOM and timing." },
  { name: "Competitor Analysis", icon: Search, desc: "Maps existing players and moats." },
  { name: "Financial Risk", icon: Coins, desc: "Models unit economics and burn." },
  { name: "Customer Psychology", icon: Glasses, desc: "Analyzes intent and buying behavior." },
  { name: "Product Strategy", icon: Box, desc: "Defines MVP scope and feature priority." },
  { name: "Growth Potential", icon: Rocket, desc: "Identifies viral loops and acquisition." },
  { name: "Investment Potential", icon: LineChart, desc: "Grades VC fundability and exit paths." },
  { name: "Execution Complexity", icon: Cpu, desc: "Rates technical and operational difficulty." },
  { name: "Business Risks", icon: Lock, desc: "Flags legal, macro, and systemic threats." },
  { name: "CEO Oracle", icon: Briefcase, desc: "Synthesizes all data for the final verdict." },
];

export default function Agents() {
  return (
    <section id="agents" className="py-32 relative bg-black/40 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="container px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Meet the Board.</h2>
          <p className="text-muted-foreground text-xl">
            Ten hyper-specialized models working in parallel to pressure-test your assumptions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-lg hover:bg-white/[0.05] hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition-all group cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <agent.icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors mb-5" />
              <h4 className="font-semibold text-white text-base mb-2">{agent.name}</h4>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">{agent.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
