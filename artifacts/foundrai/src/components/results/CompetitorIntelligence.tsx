import { motion } from "framer-motion";
import { Swords, Crosshair } from "lucide-react";
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
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr] gap-4 px-6 py-3 border-b border-white/10 bg-white/[0.02]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Competitor</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Strength</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Weakness</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Position</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 text-right">Threat</p>
        </div>
        <div className="divide-y divide-white/5">
          {competitors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr] gap-2 md:gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-secondary/70 shrink-0" />
                <h3 className="text-sm font-bold text-white">{c.name}</h3>
              </div>
              <p className="text-xs md:text-sm text-white/70 leading-snug">
                <span className="md:hidden text-white/40 uppercase text-[10px] tracking-wider mr-1">Strength:</span>
                {c.strength}
              </p>
              <p className="text-xs md:text-sm text-white/50 leading-snug">
                <span className="md:hidden text-white/40 uppercase text-[10px] tracking-wider mr-1">Weakness:</span>
                {c.weakness}
              </p>
              <p className="text-xs md:text-sm text-white/60 font-medium">
                <span className="md:hidden text-white/40 uppercase text-[10px] tracking-wider mr-1">Position:</span>
                {c.position}
              </p>
              <div className="md:text-right">
                <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border ${THREAT_COLORS[c.threat]}`}>
                  {c.threat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
