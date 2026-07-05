import { motion } from "framer-motion";
import { Map } from "lucide-react";
import { RoadmapItem } from "@/lib/resultsIntelligence";

interface GrowthRoadmapProps {
  items: RoadmapItem[];
}

export default function GrowthRoadmap({ items }: GrowthRoadmapProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-5 h-5 text-secondary" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Growth Roadmap</h2>
      </div>
      <div className="relative">
        <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="hidden md:flex absolute -top-9 left-6 w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{item.period}</p>
              <p className="text-sm text-white/80 leading-relaxed">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
