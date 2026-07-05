import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import {
  DerivedScores,
  ScoreKey,
  scoreTier,
  TIER_COLORS,
  scoreMeta,
  getScoreBreakdown,
} from "@/lib/resultsIntelligence";

const ORDER: ScoreKey[] = ["market", "competition", "financial", "risk", "growth"];

interface ScoreBreakdownProps {
  scores: DerivedScores;
  startupName: string;
  industry: string;
}

export default function ScoreBreakdown({ scores, startupName, industry }: ScoreBreakdownProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Score Breakdown</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {ORDER.map((key) => {
          const value = scores[key];
          const tier = scoreTier(key, value);
          const colors = TIER_COLORS[tier];
          const meta = scoreMeta(key);
          const { strengths, concerns } = getScoreBreakdown(key, value, scores, startupName, industry);

          return (
            <motion.div
              key={key}
              whileHover={{ y: -3 }}
              className={`bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{meta.noun}</h3>
                <span className={`text-lg font-black font-mono ${colors.text}`}>{value}/10</span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Strengths</p>
                <ul className="space-y-1.5">
                  {strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Concerns</p>
                <ul className="space-y-1.5">
                  {concerns.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <Circle className="w-2.5 h-2.5 text-rose-400/70 mt-1.5 shrink-0 fill-current" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
