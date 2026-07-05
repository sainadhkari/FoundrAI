import { motion } from "framer-motion";
import { TrendingUp, Target, DollarSign, ShieldAlert, Rocket } from "lucide-react";
import { DerivedScores, ScoreKey, scoreTier, TIER_COLORS, scoreMeta } from "@/lib/resultsIntelligence";

const ICONS: Record<ScoreKey, typeof TrendingUp> = {
  market: TrendingUp,
  competition: Target,
  financial: DollarSign,
  risk: ShieldAlert,
  growth: Rocket,
};

const ORDER: ScoreKey[] = ["market", "competition", "financial", "risk", "growth"];

interface ExecutiveScoreCardsProps {
  scores: DerivedScores;
}

export default function ExecutiveScoreCards({ scores }: ExecutiveScoreCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 h-full content-start">
      {ORDER.map((key) => {
        const value = scores[key];
        const tier = scoreTier(key, value);
        const colors = TIER_COLORS[tier];
        const Icon = ICONS[key];
        const meta = scoreMeta(key);

        return (
          <motion.div
            key={key}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative overflow-hidden bg-black/40 backdrop-blur-xl border ${colors.border} rounded-2xl p-6 shadow-lg transition-all duration-300 group`}
            style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-full blur-[40px] -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50`}
            />
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center border ${colors.border}`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">{meta.label}</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black font-mono ${colors.text}`}>{value}</span>
              <span className="text-lg text-white/30 font-mono">/10</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
