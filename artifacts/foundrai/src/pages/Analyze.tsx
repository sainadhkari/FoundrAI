import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Activity,
  BarChart3,
  LineChart,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  Target,
  DollarSign,
  Brain,
  Rocket,
  TrendingUp,
  ShieldAlert,
  Crown,
  Gauge,
  Timer,
  Zap,
} from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
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

/* ─────────────────────────────────────────────────────────
   Static config
───────────────────────────────────────────────────────── */

const CREW_PROXY_BASE = "/api/crewai";

const STEPS = [
  { id: 1, label: "Setup" },
  { id: 2, label: "Analysis" },
  { id: 3, label: "Verdict" },
];

const INDUSTRY_OPTIONS = [
  "SaaS",
  "AI / ML",
  "EdTech",
  "FinTech",
  "HealthTech",
  "E-commerce",
  "Marketplace",
  "Consumer App",
  "Cybersecurity",
  "Enterprise Software",
  "Other",
];

const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10K" },
  { value: "10k-50k", label: "$10K – 50K" },
  { value: "50k-100k", label: "$50K – 100K" },
  { value: "100k-500k", label: "$100K – 500K" },
  { value: "500k-plus", label: "$500K+" },
];

const TIMELINE_OPTIONS = [
  { value: "1-3m", label: "1 – 3 Months" },
  { value: "3-6m", label: "3 – 6 Months" },
  { value: "6-12m", label: "6 – 12 Months" },
  { value: "12m-plus", label: "12+ Months" },
];

const TEAM_OPTIONS = [
  { value: "solo", label: "Solo Founder" },
  { value: "2-5", label: "2 – 5" },
  { value: "5-10", label: "5 – 10" },
  { value: "10-plus", label: "10+" },
];

const AGENTS = [
  { name: "Market Intelligence Agent", icon: TrendingUp, color: "cyan" },
  { name: "Competitor Intelligence Agent", icon: Target, color: "violet" },
  { name: "Financial Risk Agent", icon: DollarSign, color: "emerald" },
  { name: "Customer Psychology Agent", icon: Users, color: "amber" },
  { name: "Product Strategy Agent", icon: Rocket, color: "blue" },
  { name: "Growth Strategy Agent", icon: BarChart3, color: "pink" },
  { name: "Risk Assessment Agent", icon: ShieldAlert, color: "rose" },
  { name: "Chief Executive AI", icon: Crown, color: "gold" },
] as const;

const COLOR_MAP: Record<string, { text: string; border: string; bg: string; dot: string; shadow: string }> = {
  cyan:   { text: "text-cyan-400",    border: "border-cyan-500/25",    bg: "bg-cyan-500/10",    dot: "bg-cyan-400",    shadow: "shadow-[0_0_18px_rgba(34,211,238,0.25)]" },
  violet: { text: "text-violet-400",  border: "border-violet-500/25",  bg: "bg-violet-500/10",  dot: "bg-violet-400",  shadow: "shadow-[0_0_18px_rgba(139,92,246,0.25)]" },
  emerald:{ text: "text-emerald-400", border: "border-emerald-500/25", bg: "bg-emerald-500/10", dot: "bg-emerald-400", shadow: "shadow-[0_0_18px_rgba(16,185,129,0.25)]" },
  amber:  { text: "text-amber-400",   border: "border-amber-500/25",   bg: "bg-amber-500/10",   dot: "bg-amber-400",   shadow: "shadow-[0_0_18px_rgba(245,158,11,0.25)]" },
  blue:   { text: "text-blue-400",    border: "border-blue-500/25",    bg: "bg-blue-500/10",    dot: "bg-blue-400",    shadow: "shadow-[0_0_18px_rgba(59,130,246,0.25)]" },
  pink:   { text: "text-pink-400",    border: "border-pink-500/25",    bg: "bg-pink-500/10",    dot: "bg-pink-400",    shadow: "shadow-[0_0_18px_rgba(236,72,153,0.25)]" },
  rose:   { text: "text-rose-400",    border: "border-rose-500/25",    bg: "bg-rose-500/10",    dot: "bg-rose-400",    shadow: "shadow-[0_0_18px_rgba(244,63,94,0.25)]" },
  gold:   { text: "text-amber-300",   border: "border-amber-400/30",   bg: "bg-amber-400/10",   dot: "bg-amber-300",   shadow: "shadow-[0_0_18px_rgba(252,211,77,0.3)]" },
};

const SUBMIT_PHASES = [
  "Initializing AI Boardroom...",
  "Connecting to CrewAI...",
  "Deploying Agents...",
  "Starting Analysis...",
] as const;

const MIN_IDEA_LENGTH = 50;

type FormState = {
  name: string;
  idea: string;
  industry: string;
  customers: string;
  budget: string;
  timeline: string;
  team: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  idea: "",
  industry: "",
  customers: "",
  budget: "",
  timeline: "",
  team: "",
};

export default function Analyze() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [agentsActive, setAgentsActive] = useState(false);

  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);

  /* Cycle through submit-phase copy while the request/poll is in flight */
  useEffect(() => {
    if (!isSubmitting) return;
    setPhaseIndex(0);
    const id = setInterval(() => {
      setPhaseIndex((p) => Math.min(p + 1, SUBMIT_PHASES.length - 1));
    }, 1400);
    return () => clearInterval(id);
  }, [isSubmitting]);

  const ideaLength = formData.idea.trim().length;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name.trim()) errs.name = "Startup name is required.";
    if (!formData.idea.trim()) {
      errs.idea = "Startup idea is required.";
    } else if (formData.idea.trim().length < MIN_IDEA_LENGTH) {
      errs.idea = `Please provide at least ${MIN_IDEA_LENGTH} characters (${ideaLength}/${MIN_IDEA_LENGTH}).`;
    }
    if (!formData.industry) errs.industry = "Select an industry.";
    if (!formData.customers.trim()) errs.customers = "Target customers is required.";
    if (!formData.budget) errs.budget = "Select a budget range.";
    if (!formData.timeline) errs.timeline = "Select a timeline.";
    if (!formData.team) errs.team = "Select a team size.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validate()) {
      setError("Please complete all required fields before proceeding.");
      return;
    }

    setIsSubmitting(true);
    setAgentsActive(true);

    try {
      const kickoffRes = await fetch(`${CREW_PROXY_BASE}/kickoff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputs: {
            startup_name: formData.name,
            startup_idea: formData.idea,
            industry: formData.industry,
            target_customers: formData.customers,
            budget: formData.budget,
            timeline: formData.timeline,
            team_size: formData.team,
          },
        }),
      });
      if (!kickoffRes.ok) throw new Error("Failed to start analysis");
      const { kickoff_id } = await kickoffRes.json();

      const intervalId = setInterval(async () => {
        try {
          const pollRes = await fetch(`${CREW_PROXY_BASE}/status/${kickoff_id}`);
          if (!pollRes.ok) throw new Error("Polling failed");
          const pollData = await pollRes.json();
          const done =
            pollData.state === "SUCCESS" ||
            pollData.state === "COMPLETE" ||
            pollData.status === "SUCCESS" ||
            pollData.status === "success" ||
            pollData.status === "completed";
          if (done) {
            clearInterval(intervalId);
            const raw = pollData.result ?? pollData.result_json ?? pollData;
            const result = typeof raw === "string" ? JSON.parse(raw) : raw;
            localStorage.setItem("foundrai_results", JSON.stringify(result));
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 1200);
          }
        } catch {
          clearInterval(intervalId);
          setIsSubmitting(false);
          setAgentsActive(false);
          setError("Analysis failed. Please try again.");
        }
      }, 5000);
    } catch (err) {
      console.error("FoundrAI kickoff error:", err);
      setIsSubmitting(false);
      setAgentsActive(false);
      setError("Analysis failed. Please try again.");
    }
  };

  const update = (key: keyof FormState, value: string) => {
    setFormData((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((f) => ({ ...f, [key]: undefined }));
  };

  const inputClass =
    "bg-black/50 border-white/10 h-12 transition-all duration-300 placeholder:text-white/20 " +
    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] hover:border-primary/40 " +
    "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:shadow-[0_0_18px_rgba(0,255,255,0.15)]";

  const triggerClass =
    "bg-black/50 border-white/10 h-12 transition-all duration-300 hover:border-primary/40 " +
    "focus:ring-2 focus:ring-primary/30 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_18px_rgba(0,255,255,0.15)]";

  const errorClass = "text-xs text-rose-400 font-medium flex items-center gap-1.5 mt-1";

  const submitLabel = useMemo(() => {
    if (isSuccess) return "Analysis Complete!";
    if (isSubmitting) return SUBMIT_PHASES[phaseIndex];
    return "Initiate FoundrAI Analysis";
  }, [isSubmitting, isSuccess, phaseIndex]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#050508] text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f3e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_15%,#000_100%,transparent_110%)]" />
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[650px] h-[650px] bg-primary/15 rounded-full blur-[150px] mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, -40, 60, 0], y: [0, 50, -40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[650px] h-[650px] bg-secondary/15 rounded-full blur-[150px] mix-blend-screen"
        />
      </div>

      {/* ── Header ── */}
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
          <Link to="/" className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <UserAvatar />
        </div>
      </header>

      <main className="relative z-10 container max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* ═══════════════ TOP SECTION ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
            <BrainCircuit className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">AI War Room Setup</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary drop-shadow-[0_0_30px_rgba(0,255,255,0.25)]">Startup</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Submit your startup details to FoundrAI's Executive Boardroom. Our AI agents will evaluate market opportunity, competition, financial viability, risk, and growth potential.
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-bold transition-all duration-300 ${
                      step.id === 1
                        ? "bg-gradient-to-tr from-primary to-secondary border-transparent text-black shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                        : "bg-white/5 border-white/10 text-white/40"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${step.id === 1 ? "text-white" : "text-white/30"}`}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="w-8 sm:w-14 h-px bg-white/10" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════ MIDDLE SECTION ═══════════════ */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 bg-black/40 border border-white/8 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="p-8 lg:p-10 border-b border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Startup Briefing Form</h2>
              </div>
              <p className="text-sm text-muted-foreground pl-12">
                Provide detailed startup information for deeper AI analysis.
              </p>
            </div>

            <fieldset disabled={isSubmitting || isSuccess} className="p-8 lg:p-10 space-y-10 disabled:opacity-60">

              {/* Section 1: Basic Info */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-primary/70 tracking-[0.2em] uppercase">01</span>
                  <h3 className="text-xs font-bold text-white/50 tracking-[0.15em] uppercase">Basic Info</h3>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Startup Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. NexusAI"
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                  {fieldErrors.name && (
                    <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="idea" className="text-white/80">Startup Idea</Label>
                    <span className={`text-[11px] font-mono ${ideaLength >= MIN_IDEA_LENGTH ? "text-emerald-400" : "text-white/30"}`}>
                      {ideaLength}/{MIN_IDEA_LENGTH}
                    </span>
                  </div>
                  <Textarea
                    id="idea"
                    placeholder="Describe your startup, problem solved, target market, and business model..."
                    rows={5}
                    value={formData.idea}
                    onChange={(e) => update("idea", e.target.value)}
                    className={`${inputClass} h-auto resize-none py-3 leading-relaxed`}
                  />
                  {fieldErrors.idea ? (
                    <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.idea}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">The more context you provide, the better the AI analysis.</p>
                  )}
                </div>
              </div>

              {/* Section 2: Market */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-primary/70 tracking-[0.2em] uppercase">02</span>
                  <h3 className="text-xs font-bold text-white/50 tracking-[0.15em] uppercase">Market</h3>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white/80">Industry</Label>
                    <Select value={formData.industry} onValueChange={(v) => update("industry", v)}>
                      <SelectTrigger className={triggerClass}>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0f] border-white/10">
                        {INDUSTRY_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.industry && (
                      <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.industry}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customers" className="text-white/80">Target Customers</Label>
                    <Input
                      id="customers"
                      placeholder="e.g. Remote teams"
                      value={formData.customers}
                      onChange={(e) => update("customers", e.target.value)}
                      className={inputClass}
                    />
                    {fieldErrors.customers && (
                      <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.customers}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Execution */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-primary/70 tracking-[0.2em] uppercase">03</span>
                  <h3 className="text-xs font-bold text-white/50 tracking-[0.15em] uppercase">Execution</h3>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white/80">Budget</Label>
                    <Select value={formData.budget} onValueChange={(v) => update("budget", v)}>
                      <SelectTrigger className={triggerClass}>
                        <SelectValue placeholder="Select Budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0f] border-white/10">
                        {BUDGET_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.budget && (
                      <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.budget}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(v) => update("timeline", v)}>
                      <SelectTrigger className={triggerClass}>
                        <SelectValue placeholder="Select Timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0f] border-white/10">
                        {TIMELINE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.timeline && (
                      <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.timeline}</p>
                    )}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-white/80">Team Size</Label>
                    <Select value={formData.team} onValueChange={(v) => update("team", v)}>
                      <SelectTrigger className={triggerClass}>
                        <SelectValue placeholder="Select Team Size" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0f] border-white/10">
                        {TEAM_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.team && (
                      <p className={errorClass}><AlertCircle className="w-3.5 h-3.5" />{fieldErrors.team}</p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          </motion.div>

          {/* ── RIGHT: Boardroom Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-8 bg-[#0a0a0f]/80 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(0,255,255,0.08)]">

              <div className="flex items-center gap-3 mb-1 border-b border-white/5 pb-6">
                <div className="relative w-11 h-11 shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary to-secondary opacity-30 blur-[8px] animate-pulse" />
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0a1628] to-[#0d1f3c] border border-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-wide">FoundrAI Executive Boardroom</h3>
                  <p className="text-xs text-muted-foreground">{AGENTS.length} AI agents standing by for analysis</p>
                </div>
              </div>

              {/* Agent list */}
              <div className="space-y-2.5 my-6 max-h-[340px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                {AGENTS.map((agent, idx) => {
                  const c = COLOR_MAP[agent.color];
                  return (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.06 }}
                      className={`flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border ${c.border} group hover:bg-white/[0.05] transition-colors duration-300`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 shrink-0 rounded-full ${c.bg} border ${c.border} flex items-center justify-center`}>
                          <agent.icon className={`w-3.5 h-3.5 ${c.text}`} />
                        </div>
                        <span className="text-sm font-medium text-white/80 truncate">{agent.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={agentsActive ? "active" : "ready"}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className={`text-[10px] uppercase tracking-wider font-mono font-bold ${agentsActive ? c.text : "text-muted-foreground"}`}
                          >
                            {agentsActive ? "ACTIVE" : "READY"}
                          </motion.span>
                        </AnimatePresence>
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${agentsActive ? c.dot : "bg-white/20"}`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${agentsActive ? c.dot : "bg-white/30"}`} />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Live system metrics */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                {[
                  { icon: Zap, label: "Active Agents", value: String(AGENTS.length) },
                  { icon: Timer, label: "Avg Time", value: "~2 min" },
                  { icon: Gauge, label: "Success Rate", value: "96.4%" },
                ].map((m) => (
                  <div key={m.label} className="bg-black/50 border border-white/8 rounded-xl p-3 text-center">
                    <m.icon className="w-3.5 h-3.5 text-primary mx-auto mb-1.5" />
                    <div className="text-sm font-black text-white font-mono">{m.value}</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Neural activity visualization */}
              <div className="bg-black/50 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className={`w-3.5 h-3.5 text-primary ${agentsActive ? "animate-pulse" : ""}`} />
                    Boardroom Activity
                  </span>
                  <LineChart className="w-4 h-4 text-primary" />
                </div>
                <div className="h-16 relative z-10 flex items-end justify-between gap-1">
                  {[40, 70, 45, 90, 65, 85, 60, 100, 50, 75, 40, 80].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: agentsActive
                          ? [`${height}%`, `${Math.max(15, height - 40)}%`, `${height}%`]
                          : [`${height * 0.4}%`, `${height * 0.55}%`, `${height * 0.4}%`],
                      }}
                      transition={{ duration: agentsActive ? 0.8 + Math.random() * 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-full rounded-t-sm relative overflow-hidden ${agentsActive ? "bg-primary/60" : "bg-primary/25"}`}
                    >
                      <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-primary to-transparent opacity-50" />
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ═══════════════ BOTTOM CTA ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center max-w-xl mx-auto"
        >
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className="w-full sm:w-auto h-16 px-12 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white shadow-[0_0_40px_rgba(0,255,255,0.3)] hover:shadow-[0_0_65px_rgba(0,255,255,0.55)] transition-all hover:scale-105 rounded-full font-bold relative group overflow-hidden border-0 disabled:opacity-90 disabled:hover:scale-100"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key={`submitting-${phaseIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <Activity className="w-5 h-5 animate-spin" />
                  <span>{SUBMIT_PHASES[phaseIndex]}</span>
                </motion.div>
              ) : isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 text-white"
                >
                  <CheckCircle2 className="w-5 h-5" />
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
                  {submitLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
          </Button>

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 flex items-center gap-2.5 justify-center bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl px-5 py-3 shadow-[0_0_25px_rgba(244,63,94,0.15)]"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                No credit card required. Analysis takes ~2 minutes.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
}
