import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { verdictColor } from "@/lib/resultsIntelligence";

interface FinalVerdictProps {
  verdict: string;
  confidence: number;
  executiveSummary: string;
  recommendation: string;
}

export default function FinalVerdict({ verdict, confidence, executiveSummary, recommendation }: FinalVerdictProps) {
  const colors = verdictColor(verdict);

  return (
    <motion.div className="relative overflow-hidden bg-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 60%)` }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none mix-blend-screen opacity-30"
        style={{ backgroundColor: colors.glow }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center border ${colors.border} mb-6`}
        >
          <Crown className={`w-8 h-8 ${colors.text}`} />
        </div>
        <h2 className="text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-4">Final CEO Verdict</h2>
        <div className={`text-4xl md:text-6xl font-black mb-2 bg-gradient-to-r ${colors.gradient} text-transparent bg-clip-text drop-shadow-md`}>
          {(verdict || "PROCEED").toUpperCase()}
        </div>
        <p className="text-white/50 font-mono text-sm mb-8">Confidence: {confidence}/10</p>

        <div className="max-w-3xl w-full space-y-6 bg-black/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl text-left">
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Reasoning</h4>
            <p className="text-lg text-white/90 leading-relaxed">{executiveSummary}</p>
          </div>
          <div className="h-px w-full bg-white/5" />
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
              Strategic Recommendation
            </h4>
            <p className={`text-lg leading-relaxed font-medium ${colors.text}`}>{recommendation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
