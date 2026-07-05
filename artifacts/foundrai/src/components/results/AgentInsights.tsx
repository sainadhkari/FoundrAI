import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, LineChart, AlertTriangle, Briefcase, Activity, ChevronDown } from "lucide-react";
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ x: 3 }}
      className="bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl transition-colors overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start gap-4 p-5 text-left"
      >
        <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white">{agent.name}</h4>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${STATUS_COLORS[agent.status]}`}>
              {agent.status}
            </span>
          </div>
          <p className="text-xs text-primary/70 mb-1.5">{agent.role}</p>
          <p className={`text-muted-foreground text-sm leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
            {agent.insight}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/30 shrink-0 mt-1 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AgentInsights({ agents }: AgentInsightsProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Agent Insights</h2>
      </div>
      <div className="grid gap-4">
        {agents.map((agent, i) => (
          <AgentCard key={agent.name} agent={agent} index={i} />
        ))}
      </div>
    </div>
  );
}
