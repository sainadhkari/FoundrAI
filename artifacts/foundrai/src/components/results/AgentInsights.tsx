import { useState } from "react";
import { Users, Target, LineChart, AlertTriangle, Briefcase, Activity, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AgentInsight } from "@/lib/resultsIntelligence";

const ICONS: Record<string, typeof Users> = {
  "Market Agent": Users,
  "Competitor Agent": Target,
  "Finance Agent": LineChart,
  "Risk Agent": AlertTriangle,
  "CEO Agent": Briefcase,
};

const STATUS_COLORS: Record<AgentInsight["status"], string> = {
  Optimistic: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Neutral: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  Cautious: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  Alert: "text-rose-400 bg-rose-500/10 border-rose-500/25",
};

interface AgentInsightsProps {
  agents: AgentInsight[];
}

function AgentCard({ agent, index }: { agent: AgentInsight; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICONS[agent.name] ?? Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-xl transition-colors overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 p-3.5 text-left"
      >
        <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-white">{agent.name}</h4>
            <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[agent.status]}`}>
              {agent.status}
            </span>
          </div>
          <p className={`text-muted-foreground text-xs leading-snug ${expanded ? "" : "truncate"}`}>
            {expanded ? agent.role : agent.insight}
          </p>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/30 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="px-3.5 pb-3.5 pl-[3.25rem]">
          <p className="text-xs text-primary/70 mb-1">{agent.role}</p>
          <p className="text-sm text-white/80 leading-relaxed">{agent.insight}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function AgentInsights({ agents }: AgentInsightsProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-white tracking-tight">AI Agent Insights</h2>
      </div>
      <div className="grid gap-2.5">
        {agents.map((agent, i) => (
          <AgentCard key={agent.name} agent={agent} index={i} />
        ))}
      </div>
    </div>
  );
}
