import { motion } from "framer-motion";
import { CheckCircle2, Circle, Grid2x2 } from "lucide-react";
import { SwotData } from "@/lib/resultsIntelligence";

interface QuadrantProps {
  title: string;
  items: string[];
  colors: { text: string; bg: string; border: string };
  positive: boolean;
}

function Quadrant({ title, items, colors, positive }: QuadrantProps) {
  return (
    <div className={`bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl p-6`}>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${colors.text}`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
            {positive ? (
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${colors.text}`} />
            ) : (
              <Circle className={`w-2.5 h-2.5 mt-1.5 shrink-0 fill-current ${colors.text}`} />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
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
          colors={{ text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" }}
          positive
        />
        <Quadrant
          title="Weaknesses"
          items={swot.weaknesses}
          colors={{ text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25" }}
          positive={false}
        />
        <Quadrant
          title="Opportunities"
          items={swot.opportunities}
          colors={{ text: "text-primary", bg: "bg-primary/10", border: "border-primary/25" }}
          positive
        />
        <Quadrant
          title="Threats"
          items={swot.threats}
          colors={{ text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" }}
          positive={false}
        />
      </div>
    </div>
  );
}
