import { motion } from "framer-motion";
import { TrendingUp, Eye, XCircle } from "lucide-react";
import { InvestmentDecision as InvestmentDecisionData } from "@/lib/resultsIntelligence";

const DECISION_META: Record<
  InvestmentDecisionData["decision"],
  { icon: typeof TrendingUp; colors: { text: string; bg: string; border: string; glow: string } }
> = {
  INVEST: { icon: TrendingUp, colors: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", glow: "rgba(16,185,129,0.3)" } },
  WATCH: { icon: Eye, colors: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", glow: "rgba(245,158,11,0.3)" } },
  PASS: { icon: XCircle, colors: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25", glow: "rgba(244,63,94,0.3)" } },
};

interface InvestmentDecisionProps {
  decision: InvestmentDecisionData;
}

export default function InvestmentDecision({ decision }: InvestmentDecisionProps) {
  const meta = DECISION_META[decision.decision];
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden bg-black/40 backdrop-blur-xl border ${meta.colors.border} rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10`}
    >
      <div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ backgroundColor: meta.colors.glow }}
      />
      <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl ${meta.colors.bg} flex items-center justify-center border ${meta.colors.border}`}>
        <Icon className={`w-10 h-10 md:w-12 md:h-12 ${meta.colors.text}`} />
      </div>
      <div className="relative z-10 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Investor Decision</p>
        <p className={`text-4xl md:text-5xl font-black mb-3 tracking-tight ${meta.colors.text}`}>{decision.decision}</p>
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">{decision.reasoning}</p>
      </div>
    </motion.div>
  );
}
