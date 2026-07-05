import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { RiskMatrixItem } from "@/lib/resultsIntelligence";

const LEVEL_COLORS: Record<RiskMatrixItem["level"], { text: string; gradient: string }> = {
  Low: { text: "text-emerald-400", gradient: "from-emerald-500 to-green-400" },
  Medium: { text: "text-amber-400", gradient: "from-amber-500 to-yellow-400" },
  High: { text: "text-rose-400", gradient: "from-rose-500 to-red-400" },
};

interface RiskMatrixProps {
  items: RiskMatrixItem[];
}

export default function RiskMatrix({ items }: RiskMatrixProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Gauge className="w-5 h-5 text-rose-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Risk Matrix</h2>
      </div>
      <div className="bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]">
        <div className="space-y-8">
          {items.map((item, i) => {
            const colors = LEVEL_COLORS[item.level];
            return (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white/80 tracking-wide">{item.label}</span>
                  <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.level}</span>
                </div>
                <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.15 * i, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${colors.gradient} shadow-[0_0_15px_currentColor] opacity-90`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
