import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar";
import { exportLongElementToPdf } from "@/lib/exportReport";
import HeroHeader from "@/components/results/HeroHeader";
import ExecutiveScoreCards from "@/components/results/ExecutiveScoreCards";
import ScoreBreakdown from "@/components/results/ScoreBreakdown";
import AgentInsights from "@/components/results/AgentInsights";
import CompetitorIntelligence from "@/components/results/CompetitorIntelligence";
import SwotMatrix from "@/components/results/SwotMatrix";
import RiskMatrix from "@/components/results/RiskMatrix";
import GrowthRoadmap from "@/components/results/GrowthRoadmap";
import FinalVerdict from "@/components/results/FinalVerdict";
import InvestmentDecision from "@/components/results/InvestmentDecision";
import ActionButtons from "@/components/results/ActionButtons";
import {
  StartupResults,
  deriveScores,
  getAgentInsights,
  getCompetitors,
  getSwot,
  getRiskMatrix,
  getRoadmap,
  getInvestmentDecision,
} from "@/lib/resultsIntelligence";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!reportRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const safeName = (startupName || "FoundrAI-Startup").replace(/[^a-z0-9]+/gi, "-");
      await exportLongElementToPdf(reportRef.current, `${safeName}-FoundrAI-Report.pdf`);
    } catch (err) {
      console.error("Failed to export PDF report", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const results: StartupResults | null = useMemo(() => {
    const raw = localStorage.getItem("foundrai_results");
    return raw ? JSON.parse(raw) : null;
  }, []);

  useEffect(() => {
    if (!results) {
      navigate("/analyze");
    }
  }, []);

  const startupName = results?.startup_name ?? "Project Nova";
  const industry = results?.industry ?? "";
  const verdict = results?.verdict ?? "Proceed";
  const executiveSummary =
    results?.executive_summary ??
    "Strong market opportunity with healthy growth potential, but moderate competition and execution complexity.";
  const recommendation =
    results?.recommendation ??
    "Start with an MVP targeting your core segment and focus on niche differentiation.";

  const scores = useMemo(() => deriveScores(results ?? {}), [results]);
  const agents = useMemo(
    () => getAgentInsights(scores, startupName, industry, executiveSummary, verdict),
    [scores, startupName, industry, executiveSummary, verdict],
  );
  const competitors = useMemo(() => getCompetitors(industry), [industry]);
  const swot = useMemo(() => getSwot(scores, industry, startupName), [scores, industry, startupName]);
  const riskMatrix = useMemo(() => getRiskMatrix(scores), [scores]);
  const roadmap = useMemo(() => getRoadmap(verdict, recommendation), [verdict, recommendation]);
  const investmentDecision = useMemo(
    () => getInvestmentDecision(verdict, scores.confidence),
    [verdict, scores.confidence],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#050508] text-foreground selection:bg-primary/30 overflow-x-hidden relative pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f3e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,#000_100%,transparent_110%)]" />
      </div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* Navbar/Header */}
      <header className="relative z-50 px-6 py-6 flex items-center justify-between border-b border-white/5 bg-background/20 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-transform group-hover:scale-105">
              F
            </div>
            <span className="font-semibold text-lg tracking-tight">FoundrAI</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/analyze"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            New Analysis
          </Link>
          <UserAvatar />
        </div>
      </header>

      <main className="relative z-10 container max-w-6xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* Section 1: Hero Header */}
          <motion.div variants={itemVariants}>
            <HeroHeader startupName={startupName} verdict={verdict} confidence={scores.confidence} />
          </motion.div>

          {/* Section 2: Executive Score Cards */}
          <motion.div variants={itemVariants}>
            <ExecutiveScoreCards scores={scores} />
          </motion.div>

          {/* Section 3: Score Breakdown */}
          <motion.div variants={itemVariants}>
            <ScoreBreakdown scores={scores} startupName={startupName} industry={industry} />
          </motion.div>

          {/* Section 4: AI Agent Insights */}
          <motion.div variants={itemVariants}>
            <AgentInsights agents={agents} />
          </motion.div>

          {/* Section 5: Competitor Intelligence */}
          <motion.div variants={itemVariants}>
            <CompetitorIntelligence competitors={competitors} />
          </motion.div>

          {/* Section 6: SWOT Analysis */}
          <motion.div variants={itemVariants}>
            <SwotMatrix swot={swot} />
          </motion.div>

          {/* Section 7: Risk Matrix */}
          <motion.div variants={itemVariants}>
            <RiskMatrix items={riskMatrix} />
          </motion.div>

          {/* Section 8: Growth Roadmap */}
          <motion.div variants={itemVariants}>
            <GrowthRoadmap items={roadmap} />
          </motion.div>

          {/* Section 9: Final CEO Verdict */}
          <motion.div variants={itemVariants}>
            <FinalVerdict
              verdict={verdict}
              confidence={scores.confidence}
              executiveSummary={executiveSummary}
              recommendation={recommendation}
            />
          </motion.div>

          {/* Section 10: Investment Decision */}
          <motion.div variants={itemVariants}>
            <InvestmentDecision decision={investmentDecision} />
          </motion.div>

          {/* Section 11: Action Buttons */}
          <motion.div variants={itemVariants}>
            <ActionButtons isDownloading={isDownloading} onDownload={handleDownload} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
