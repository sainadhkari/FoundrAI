import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar";
import { exportLongElementToPdf } from "@/lib/exportReport";
import { useToast } from "@/hooks/use-toast";
import HeroHeader from "@/components/results/HeroHeader";
import ExecutiveSnapshot from "@/components/results/ExecutiveSnapshot";
import ExecutiveScoreCards from "@/components/results/ExecutiveScoreCards";
import ScoreRadarChart from "@/components/results/ScoreRadarChart";
import ScoreBreakdown from "@/components/results/ScoreBreakdown";
import StartupDNA from "@/components/results/StartupDNA";
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
  getStartupDNA,
} from "@/lib/resultsIntelligence";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!reportRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const safeName = (startupName || "FoundrAI-Startup").replace(/[^a-z0-9]+/gi, "-");
      await exportLongElementToPdf(reportRef.current, `${safeName}-FoundrAI-Report.pdf`);
      toast({
        title: "Investor memo downloaded",
        description: `${safeName}-FoundrAI-Report.pdf has been saved.`,
      });
    } catch (err) {
      console.error("Failed to export PDF report", err);
      toast({
        title: "Download failed",
        description: "Something went wrong while generating the PDF. Please try again.",
        variant: "destructive",
      });
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
  const startupDNA = useMemo(
    () => getStartupDNA(scores, industry, verdict),
    [scores, industry, verdict],
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
    <div className="min-h-[100dvh] w-full bg-[#050508] text-foreground selection:bg-primary/30 overflow-x-hidden relative">
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

      <main className="relative z-10 container max-w-6xl mx-auto px-6 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 md:space-y-14"
        >
          <div ref={reportRef} className="space-y-12 md:space-y-14 bg-[#050508]">
          {/* Section 1: Hero Header */}
          <motion.div variants={itemVariants}>
            <HeroHeader startupName={startupName} verdict={verdict} confidence={scores.confidence} />
          </motion.div>

          {/* Section 2: Executive Snapshot */}
          <motion.div variants={itemVariants}>
            <ExecutiveSnapshot scores={scores} />
          </motion.div>

          {/* Section 3: Score Cards + Radar */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
            <ExecutiveScoreCards scores={scores} />
            <ScoreRadarChart scores={scores} />
          </motion.div>

          {/* Section 4: Score Breakdown */}
          <motion.div variants={itemVariants}>
            <ScoreBreakdown scores={scores} startupName={startupName} industry={industry} />
          </motion.div>

          {/* Section 5: Startup DNA */}
          <motion.div variants={itemVariants}>
            <StartupDNA dna={startupDNA} />
          </motion.div>

          {/* Section 6: AI Agent Insights */}
          <motion.div variants={itemVariants}>
            <AgentInsights agents={agents} />
          </motion.div>

          {/* Section 7: Competitor Intelligence */}
          <motion.div variants={itemVariants}>
            <CompetitorIntelligence competitors={competitors} />
          </motion.div>

          {/* Section 8: SWOT Analysis */}
          <motion.div variants={itemVariants}>
            <SwotMatrix swot={swot} />
          </motion.div>

          {/* Section 9: Risk Matrix */}
          <motion.div variants={itemVariants}>
            <RiskMatrix items={riskMatrix} />
          </motion.div>

          {/* Section 10: Growth Roadmap */}
          <motion.div variants={itemVariants}>
            <GrowthRoadmap items={roadmap} />
          </motion.div>

          {/* Section 11: Final CEO Verdict */}
          <motion.div variants={itemVariants}>
            <FinalVerdict
              verdict={verdict}
              confidence={scores.confidence}
              executiveSummary={executiveSummary}
              recommendation={recommendation}
              scores={scores}
            />
          </motion.div>

          {/* Section 12: Investment Decision */}
          <motion.div variants={itemVariants}>
            <InvestmentDecision decision={investmentDecision} />
          </motion.div>
          </div>

          {/* Section 13: Action Buttons */}
          <motion.div variants={itemVariants} className="pb-10 md:pb-16">
            <ActionButtons isDownloading={isDownloading} onDownload={handleDownload} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
