import { motion } from "framer-motion";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Radar as RadarIcon } from "lucide-react";
import { DerivedScores, getRadarData } from "@/lib/resultsIntelligence";

interface ScoreRadarChartProps {
  scores: DerivedScores;
}

export default function ScoreRadarChart({ scores }: ScoreRadarChartProps) {
  const data = getRadarData(scores);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 h-full flex flex-col"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.08),transparent_65%)] pointer-events-none" />
      <div className="relative z-10 flex items-center gap-2 mb-2">
        <RadarIcon className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Signal Radar</h3>
      </div>
      <div className="relative z-10 flex-1 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} outerRadius="72%">
            <defs>
              <radialGradient id="radarFill" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.12} />
              </radialGradient>
            </defs>
            <PolarGrid stroke="rgba(255,255,255,0.12)" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }}
              axisLine={false}
              tickCount={6}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#radarFill)"
              fillOpacity={1}
              isAnimationActive
              animationDuration={1200}
              animationEasing="ease-out"
              dot={{ r: 3, fill: "#22d3ee", stroke: "#0891b2", strokeWidth: 1 }}
              style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.6))" }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
