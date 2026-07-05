import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { verdictColor } from "@/lib/resultsIntelligence";

interface HeroHeaderProps {
  startupName: string;
  verdict: string;
  confidence: number;
}

export default function HeroHeader({ startupName, verdict, confidence }: HeroHeaderProps) {
  const colors = verdictColor(verdict);

  return (
    <motion.div className="relative overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <BrainCircuit className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              {startupName || "Project Nova"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Startup Analysis{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Results
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Analysis complete by FoundrAI Executive Boardroom.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-start md:items-end">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide uppercase">Analysis Complete</span>
          </div>

          <div className="flex items-center gap-6 bg-black/30 border border-white/10 rounded-2xl px-6 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Verdict</p>
              <p className={`text-xl font-black ${colors.text}`}>{(verdict || "PROCEED").toUpperCase()}</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Confidence</p>
              <p className="text-xl font-black text-white font-mono">{confidence}/10</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
