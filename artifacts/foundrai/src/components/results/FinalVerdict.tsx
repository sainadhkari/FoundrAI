import { motion } from "framer-motion";
import { Crown, CheckCircle2, ArrowRight } from "lucide-react";
import { verdictColor, gradeFromAverage, GRADE_COLORS, DerivedScores } from "@/lib/resultsIntelligence";

interface FinalVerdictProps {
  verdict: string;
  confidence: number;
  executiveSummary: string;
  recommendation: string;
  scores: DerivedScores;
}

export default function FinalVerdict({ verdict, confidence, executiveSummary, recommendation, scores }: FinalVerdictProps) {
  const colors = verdictColor(verdict);
  const avg = (scores.market + scores.competition + scores.financial + scores.growth + (10 - scores.risk)) / 5;
  const grade = gradeFromAverage(avg);
  const gradeColors = GRADE_COLORS[grade];

  const reasoningPoints = executiveSummary
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-black border border-white/10 rounded-3xl p-8 md:p-14 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{ background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 65%)` }}
      />
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[130px] -mr-40 -mt-40 pointer-events-none mix-blend-screen"
        style={{ backgroundColor: colors.glow }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center border ${colors.border} mb-6`}>
          <Crown className={`w-8 h-8 ${colors.text}`} />
        </div>
        <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.35em] mb-4">Final CEO Verdict</h2>
        <div
          className={`text-5xl md:text-8xl font-black mb-6 bg-gradient-to-r ${colors.gradient} text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] tracking-tight`}
        >
          {(verdict || "PROCEED").toUpperCase()}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-3 bg-black/50 border border-white/10 rounded-2xl px-5 py-3">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Confidence</p>
            <p className="text-lg font-black text-white font-mono">{confidence}/10</p>
          </div>
          <div className={`flex items-center gap-3 border rounded-2xl px-5 py-3 ${gradeColors.bg} ${gradeColors.border}`}>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Investment Grade</p>
            <p className={`text-lg font-black font-mono ${gradeColors.text}`}>{grade}</p>
          </div>
          <div className={`flex items-center gap-3 border rounded-2xl px-5 py-3 ${colors.bg} ${colors.border}`}>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Board Recommendation</p>
            <p className={`text-lg font-black uppercase ${colors.text}`}>{(verdict || "PROCEED").toUpperCase()}</p>
          </div>
        </div>

        <div className="max-w-3xl w-full space-y-6 bg-black/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl text-left">
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Reasoning</h4>
            <ul className="space-y-2">
              {reasoningPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-base text-white/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-px w-full bg-white/5" />
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
              Strategic Recommendation
            </h4>
            <p className={`flex items-start gap-2 text-lg leading-relaxed font-medium ${colors.text}`}>
              <ArrowRight className="w-5 h-5 mt-1 shrink-0" />
              <span>{recommendation}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
