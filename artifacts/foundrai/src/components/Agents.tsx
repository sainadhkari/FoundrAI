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
    <section id="agents" className="py-24 relative bg-black/40 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">Meet the Board.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Ten hyper-specialized models working in parallel to pressure-test your assumptions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all group cursor-default"
            >
              <agent.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <h4 className="font-semibold text-white text-sm mb-2">{agent.name}</h4>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">{agent.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
