import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  LineChart, 
  Users, 
  DollarSign, 
  BrainCircuit, 
  Target, 
  AlertTriangle, 
  Briefcase 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const rawResults = localStorage.getItem("foundrai_results");
  const results = rawResults ? JSON.parse(rawResults) : null;

  useEffect(() => {
    if (!results) {
      navigate("/analyze");
    }
  }, []);

  const scores = [
    { label: "Market Score", value: results?.market_score ?? 8.7, max: 10, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { label: "Competition Score", value: results?.competition_score ?? 6.2, max: 10, icon: Target, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "Financial Score", value: results?.financial_score ?? 7.9, max: 10, icon: DollarSign, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { label: "Risk Score", value: results?.risk_score ?? 4.8, max: 10, icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  ];

  const agents = [
    { name: "Market Agent", insight: "Strong market demand in AI-powered EdTech.", icon: Users, color: "text-primary" },
    { name: "Competitor Agent", insight: "Moderate competition with room for niche positioning.", icon: Target, color: "text-primary" },
    { name: "Finance Agent", insight: "Profitable business model possible within 12–18 months.", icon: LineChart, color: "text-primary" },
    { name: "Risk Agent", insight: "Execution complexity medium due to market competition.", icon: AlertTriangle, color: "text-primary" },
    { name: "CEO Agent", insight: "Strong opportunity with strategic execution required.", icon: Briefcase, color: "text-primary" },
  ];

  const metrics = [
    { label: "Market Opportunity", value: 85, color: "from-green-500 to-emerald-400" },
    { label: "Competition Level", value: 60, color: "from-yellow-500 to-orange-400" },
    { label: "Growth Potential", value: 90, color: "from-primary to-secondary" },
    { label: "Execution Difficulty", value: 65, color: "from-rose-500 to-red-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </header>

      <main className="relative z-10 container max-w-6xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Section 1: Page Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <BrainCircuit className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">Project Nova</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                Startup Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Results</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                FoundrAI's AI boardroom completed full analysis of your startup.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase">Analysis Complete</span>
            </div>
          </motion.div>

          {/* Section 2: Summary Score Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scores.map((score, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative overflow-hidden bg-black/40 backdrop-blur-xl border ${score.border} rounded-2xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300 group`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${score.bg} rounded-full blur-[40px] -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50`} />
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${score.bg} flex items-center justify-center border ${score.border}`}>
                    <score.icon className={`w-5 h-5 ${score.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">{score.label}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black font-mono ${score.color}`}>{score.value}</span>
                  <span className="text-lg text-white/30 font-mono">/{score.max}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Section 3 & 4: Insights & Visual Analysis Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: AI Agent Insights */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold text-white tracking-tight">AI Agent Insights</h2>
              </div>
              <div className="grid gap-4">
                {agents.map((agent, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="flex items-start gap-4 bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10 p-5 rounded-2xl transition-all hover:bg-white/[0.02]"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <agent.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{agent.name}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{agent.insight}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Visual Analysis */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <LineChart className="w-5 h-5 text-secondary" />
                <h2 className="text-2xl font-bold text-white tracking-tight">Visual Analysis</h2>
              </div>
              <div className="bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,255,255,0.05)]">
                <div className="space-y-8">
                  {metrics.map((metric, i) => (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-white/80 tracking-wide">{metric.label}</span>
                        <span className="text-sm font-mono text-white">{metric.value}%</span>
                      </div>
                      <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${metric.color} shadow-[0_0_15px_currentColor] opacity-90`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section 5: Final Verdict */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden bg-black border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(245,158,11,0.15)] mt-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none mix-blend-screen" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/40 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-sm font-bold text-amber-500/80 uppercase tracking-[0.3em] mb-4">Final CEO Verdict</h2>
              <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 mb-8 drop-shadow-md">
                {results?.verdict?.toUpperCase() ?? "PROCEED WITH CAUTION"}
              </div>
              
              <div className="max-w-3xl space-y-6 bg-black/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl text-left">
                <div>
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Reasoning</h4>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {results?.executive_summary ?? "Strong market opportunity with healthy growth potential, but moderate competition and execution complexity."}
                  </p>
                </div>
                <div className="h-px w-full bg-white/5" />
                <div>
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Recommendation</h4>
                  <p className="text-lg text-amber-100/90 leading-relaxed font-medium">
                    {results?.recommendation ?? "Start with MVP targeting your core segment and focus on niche differentiation."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 6: Bottom CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button
              onClick={() => navigate("/analyze")}
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all hover:scale-105 rounded-full font-bold relative group overflow-hidden border-0"
            >
              <BrainCircuit className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Analyze Another Startup</span>
              <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100" />
            </Button>
            
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 text-base border-white/10 hover:bg-white/10 bg-black/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-105 disabled:opacity-80 disabled:hover:scale-100"
            >
              {isDownloading ? (
                <>
                  <Activity className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </>
              )}
            </Button>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
