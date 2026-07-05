import { motion } from "framer-motion";
import { Map, ArrowRight } from "lucide-react";
import { RoadmapItem } from "@/lib/resultsIntelligence";

interface GrowthRoadmapProps {
  items: RoadmapItem[];
}

export default function GrowthRoadmap({ items }: GrowthRoadmapProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <Map className="w-5 h-5 text-secondary" />
        <h2 className="text-xl font-bold text-white tracking-tight">Growth Roadmap</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
        {items.map((item, i) => (
          <motion.div
            key={item.period}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -3 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_10px_rgba(0,255,255,0.5)] shrink-0" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{item.period}</p>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-primary/25 rounded-2xl p-4 transition-colors flex flex-col">
              <p className="text-sm font-bold text-white mb-2.5">{item.title}</p>
              <ul className="space-y-1.5">
                {item.bullets.slice(0, 3).map((bullet, bi) => (
                  <li key={bi} className="flex items-start gap-1.5 text-xs text-white/70 leading-snug">
                    <ArrowRight className="w-3 h-3 text-secondary/70 mt-0.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
