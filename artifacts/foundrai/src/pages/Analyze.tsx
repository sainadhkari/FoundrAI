import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BrainCircuit, Activity, BarChart3, LineChart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Analyze() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    idea: "",
    industry: "",
    customers: "",
    budget: "",
    timeline: "",
    team: ""
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const startRes = await fetch("/fastapi/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startup_name: formData.name,
          startup_idea: formData.idea,
          industry: formData.industry,
          budget: formData.budget,
          timeline: formData.timeline,
        }),
      });
      if (!startRes.ok) throw new Error("Failed to start analysis");
      const { job_id } = await startRes.json();

      const intervalId = setInterval(async () => {
        try {
          const pollRes = await fetch(`/fastapi/status/${job_id}`);
          if (!pollRes.ok) throw new Error("Polling failed");
          const pollData = await pollRes.json();
          if (pollData.status === "completed") {
            clearInterval(intervalId);
            localStorage.setItem("foundrai_results", JSON.stringify(pollData.result));
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 1200);
          }
        } catch {
          clearInterval(intervalId);
          setIsSubmitting(false);
          setError("Analysis failed. Please try again.");
        }
      }, 3000);
    } catch {
      setIsSubmitting(false);
      setError("Analysis failed. Please try again.");
    }
  };

  const agents = [
    { name: "CEO Agent", status: "Waiting", type: "amber" },
    { name: "Market Agent", status: "Ready", type: "cyan" },
    { name: "Competitor Agent", status: "Ready", type: "cyan" },
    { name: "Finance Agent", status: "Ready", type: "cyan" },
    { name: "Risk Agent", status: "Ready", type: "cyan" }
  ];

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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </header>

      <main className="relative z-10 container max-w-6xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <BrainCircuit className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">AI War Room Setup</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Startup</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Provide your startup details. FoundrAI's 10 AI agents will analyze market opportunity, competitors, financial risk, growth potential, and execution complexity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 space-y-8 bg-black/40 border border-white/5 backdrop-blur-xl p-8 rounded-3xl"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">Startup Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. NexusAI" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 h-12 transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idea" className="text-white/80">Startup Idea</Label>
                <Textarea 
                  id="idea" 
                  placeholder="Describe your product, problem it solves, and how it works..." 
                  rows={4}
                  value={formData.idea}
                  onChange={(e) => setFormData({...formData, idea: e.target.value})}
                  className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 resize-none transition-all placeholder:text-white/20"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/80">Industry</Label>
                  <Select value={formData.industry} onValueChange={(v) => setFormData({...formData, industry: v})}>
                    <SelectTrigger className="bg-black/50 border-white/10 focus:ring-primary/30 h-12">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0f] border-white/10">
                      <SelectItem value="edtech">EdTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="ai-saas">AI SaaS</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customers" className="text-white/80">Target Customers</Label>
                  <Input 
                    id="customers" 
                    placeholder="e.g. Remote teams" 
                    value={formData.customers}
                    onChange={(e) => setFormData({...formData, customers: e.target.value})}
                    className="bg-black/50 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 h-12 transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Budget</Label>
                  <Select value={formData.budget} onValueChange={(v) => setFormData({...formData, budget: v})}>
                    <SelectTrigger className="bg-black/50 border-white/10 focus:ring-primary/30 h-12">
                      <SelectValue placeholder="Select Budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0f] border-white/10">
                      <SelectItem value="1l">&lt; ₹1L</SelectItem>
                      <SelectItem value="1-5l">₹1–5L</SelectItem>
                      <SelectItem value="5-20l">₹5–20L</SelectItem>
                      <SelectItem value="20l+">₹20L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(v) => setFormData({...formData, timeline: v})}>
                    <SelectTrigger className="bg-black/50 border-white/10 focus:ring-primary/30 h-12">
                      <SelectValue placeholder="Select Timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0f] border-white/10">
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-white/80">Team Size</Label>
                  <Select value={formData.team} onValueChange={(v) => setFormData({...formData, team: v})}>
                    <SelectTrigger className="bg-black/50 border-white/10 focus:ring-primary/30 h-12">
                      <SelectValue placeholder="Select Team Size" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0f] border-white/10">
                      <SelectItem value="solo">Solo</SelectItem>
                      <SelectItem value="2-5">2–5</SelectItem>
                      <SelectItem value="5-20">5–20</SelectItem>
                      <SelectItem value="20+">20+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Status Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24 bg-[#0a0a0f]/80 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,255,255,0.1)]">
              
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-wide">AI Boardroom Status</h3>
                  <p className="text-xs text-muted-foreground">System nodes standing by</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {agents.map((agent, idx) => (
                  <motion.div 
                    key={agent.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (idx * 0.1) }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                        <LineChart className="w-3.5 h-3.5 text-white/50" />
                      </div>
                      <span className="text-sm font-medium text-white/80">{agent.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
                        {agent.status}
                      </span>
                      <span className={`relative flex h-2.5 w-2.5`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${agent.type === 'cyan' ? 'bg-primary' : 'bg-amber-500'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${agent.type === 'cyan' ? 'bg-primary' : 'bg-amber-500'}`}></span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Glowing Chart Mockup */}
              <div className="bg-black/50 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Network Activity</span>
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="h-16 relative z-10 flex items-end justify-between gap-1">
                  {[40, 70, 45, 90, 65, 85, 60, 100, 50, 75, 40, 80].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${height}%`, `${Math.max(20, height - 20)}%`, `${height}%`] }}
                      transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                      className="w-full bg-primary/40 rounded-t-sm relative overflow-hidden group"
                    >
                      <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-primary to-transparent opacity-50" />
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center max-w-xl mx-auto"
        >
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className="w-full sm:w-auto h-16 px-12 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white shadow-[0_0_40px_rgba(0,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,255,255,0.5)] transition-all hover:scale-105 rounded-full font-bold relative group overflow-hidden border-0 disabled:opacity-80 disabled:hover:scale-100"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <Activity className="w-5 h-5 animate-spin" />
                  <span>Initializing War Room...</span>
                </motion.div>
              ) : isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 text-white"
                >
                  <span>Analysis Complete!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  Analyze with FoundrAI 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100" />
          </Button>
          {error && (
            <p className="mt-4 text-sm text-rose-400 font-medium">{error}</p>
          )}
          {!error && (
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Analysis takes ~2 minutes.
            </p>
          )}
        </motion.div>

      </main>
    </div>
  );
}
