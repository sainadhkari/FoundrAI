import { motion } from "framer-motion";
import { Gauge, ShieldCheck, Award, BrainCog } from "lucide-react";
import { DerivedScores, getExecutiveSnapshot, GRADE_COLORS } from "@/lib/resultsIntelligence";

interface ExecutiveSnapshotProps {
  scores: DerivedScores;
}

const OPPORTUNITY_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  High: { text: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/10" },
  Moderate: { text: "text-amber-400", border: "border-amber-500/25", bg: "bg-amber-500/10" },
  Low: { text: "text-rose-400", border: "border-rose-500/25", bg: "bg-rose-500/10" },
};

const RISK_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  Low: { text: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/10" },
  Moderate: { text: "text-amber-400", border: "border-amber-500/25", bg: "bg-amber-500/10" },
  High: { text: "text-rose-400", border: "border-rose-500/25", bg: "bg-rose-500/10" },
};

export default function ExecutiveSnapshot({ scores }: ExecutiveSnapshotProps) {
  const snapshot = getExecutiveSnapshot(scores);
  const gradeColors = GRADE_COLORS[snapshot.investmentGrade];
  const oppColors = OPPORTUNITY_COLORS[snapshot.opportunityLevel];
  const riskColors = RISK_COLORS[snapshot.riskLevel];

  const cards = [
    {
      label: "Opportunity Level",
      value: snapshot.opportunityLevel,
      icon: Gauge,
      colors: oppColors,
    },
    {
      label: "Risk Level",
      value: snapshot.riskLevel,
      icon: ShieldCheck,
      colors: riskColors,
    },
    {
      label: "Investment Grade",
      value: snapshot.investmentGrade,
      icon: Award,
      colors: gradeColors,
    },
    {
      label: "Board Confidence",
      value: `${snapshot.boardConfidencePercent}%`,
      icon: BrainCog,
      colors: { text: "text-primary", border: "border-primary/25", bg: "bg-primary/10" },
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.25em]">Executive Snapshot</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden bg-black/40 backdrop-blur-xl border ${card.colors.border} rounded-2xl p-4 sm:p-5 group`}
            >
              <div
                className={`absolute -top-6 -right-6 w-20 h-20 ${card.colors.bg} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative z-10 flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${card.colors.text}`} />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">{card.label}</p>
              </div>
              <p className={`relative z-10 text-2xl sm:text-3xl font-black ${card.colors.text}`}>{card.value}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
