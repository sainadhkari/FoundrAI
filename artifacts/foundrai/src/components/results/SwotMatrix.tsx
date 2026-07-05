import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Lightbulb, Flame, Grid2x2 } from "lucide-react";
import { SwotData } from "@/lib/resultsIntelligence";

interface QuadrantProps {
  title: string;
  items: string[];
  colors: { text: string; bg: string; border: string; glow: string };
  icon: typeof CheckCircle2;
  index: number;
}

function Quadrant({ title, items, colors, icon: Icon, index }: QuadrantProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className={`relative overflow-hidden bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl p-6`}
    >
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-40"
        style={{ backgroundColor: colors.glow }}
      />
      <div className="relative z-10 flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        <h3 className={`text-sm font-bold uppercase tracking-wider ${colors.text}`}>{title}</h3>
      </div>
      <ul className="relative z-10 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colors.bg} border ${colors.border}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface SwotMatrixProps {
  swot: SwotData;
}

export default function SwotMatrix({ swot }: SwotMatrixProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Grid2x2 className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold text-white tracking-tight">SWOT Analysis</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Quadrant
          title="Strengths"
          items={swot.strengths}
          icon={CheckCircle2}
          index={0}
          colors={{ text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", glow: "rgba(16,185,129,0.25)" }}
        />
        <Quadrant
          title="Weaknesses"
          items={swot.weaknesses}
          icon={AlertCircle}
          index={1}
          colors={{ text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25", glow: "rgba(244,63,94,0.25)" }}
        />
        <Quadrant
          title="Opportunities"
          items={swot.opportunities}
          icon={Lightbulb}
          index={2}
          colors={{ text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", glow: "rgba(59,130,246,0.25)" }}
        />
        <Quadrant
          title="Threats"
          items={swot.threats}
          icon={Flame}
          index={3}
          colors={{ text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", glow: "rgba(245,158,11,0.25)" }}
        />
      </div>
    </div>
  );
}
