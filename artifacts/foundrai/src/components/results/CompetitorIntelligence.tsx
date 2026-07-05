import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { Competitor } from "@/lib/resultsIntelligence";

const THREAT_COLORS: Record<Competitor["threat"], string> = {
  High: "text-rose-400 bg-rose-500/10 border-rose-500/25",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  Low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
};

interface CompetitorIntelligenceProps {
  competitors: Competitor[];
}

export default function CompetitorIntelligence({ competitors }: CompetitorIntelligenceProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Swords className="w-5 h-5 text-secondary" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Competitor Intelligence Matrix</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitors.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{c.name}</h3>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border ${THREAT_COLORS[c.threat]}`}>
                {c.threat} Threat
              </span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Strength</p>
              <p className="text-sm text-white/80 leading-relaxed">{c.strength}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Weakness</p>
              <p className="text-sm text-white/60 leading-relaxed">{c.weakness}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
