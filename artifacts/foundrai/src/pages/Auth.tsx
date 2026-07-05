import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  BrainCircuit,
  Eye,
  EyeOff,
  ShieldAlert,
  Lock,
  Copy,
  Check,
  ArrowRight,
  Loader2,
  TrendingUp,
  Target,
  DollarSign,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateCredentials, getDemoAccounts } from "@/hooks/useAuth";

/* ─── Data ─────────────────────────────────────────────── */

const features = [
  { label: "Market Opportunity Analysis",      Icon: TrendingUp   },
  { label: "Competitor Intelligence Mapping",  Icon: Target       },
  { label: "Financial Risk Modeling",          Icon: DollarSign   },
  { label: "Growth Strategy Optimization",     Icon: BarChart3    },
  { label: "CEO-Level Strategic Verdict",      Icon: BrainCircuit },
];

const metrics = [
  { target: 1000, suffix: "+", label: "Startup Analyses"    },
  { target: 92,   suffix: "%", label: "Founder Satisfaction" },
  { target: 10,   suffix: "",  label: "AI Agents"            },
];

const ROLE_STYLE: Record<string, {
  bg: string; text: string; border: string;
  glow: string; dot: string; badge: string;
}> = {
  Founder: {
    bg:    "bg-emerald-500/8",
    text:  "text-emerald-400",
    border:"border-emerald-500/25",
    glow:  "hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]",
    dot:   "bg-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  Investor: {
    bg:    "bg-violet-500/8",
    text:  "text-violet-400",
    border:"border-violet-500/25",
    glow:  "hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]",
    dot:   "bg-violet-400",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  Admin: {
    bg:    "bg-amber-500/8",
    text:  "text-amber-400",
    border:"border-amber-500/25",
    glow:  "hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]",
    dot:   "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
};

const shakeVariants = {
  idle:  { x: 0 },
  shake: { x: [0, -14, 14, -10, 10, -6, 6, 0], transition: { duration: 0.55, ease: "easeOut" } },
};

/* ─── Animated counter ──────────────────────────────────── */

function AnimatedCounter({ target, suffix, delay = 0 }: { target: number; suffix: string; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1400;
      let startTime: number | null = null;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(ease * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return <>{count}{suffix}</>;
}

/* ─── Success overlay ───────────────────────────────────── */

type SuccessPhase = "authenticating" | "granted" | "boarding" | null;

function SuccessOverlay({ phase }: { phase: SuccessPhase }) {
  return (
    <AnimatePresence>
      {phase && (
        <motion.div
          key="success-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508]/95 backdrop-blur-2xl"
        >
          {/* glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
            />
          </div>

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-8 text-center px-6"
          >
            {/* Icon ring */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border border-primary/40 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,255,0.4)]">
                <AnimatePresence mode="wait">
                  {phase === "granted" || phase === "boarding" ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-12 h-12 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="spin"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-primary/50"
              />
            </div>

            {/* Status text */}
            <AnimatePresence mode="wait">
              {phase === "authenticating" && (
                <motion.div key="auth-txt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
                  <p className="text-2xl font-extrabold text-white tracking-tight">Authenticating...</p>
                  <p className="text-sm text-muted-foreground">Verifying your credentials</p>
                </motion.div>
              )}
              {phase === "granted" && (
                <motion.div key="granted-txt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
                  <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tight">Access Granted.</p>
                  <p className="text-sm text-primary/70 font-medium">Identity verified successfully</p>
                </motion.div>
              )}
              {phase === "boarding" && (
                <motion.div key="boarding-txt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2">
                  <p className="text-2xl font-extrabold text-white tracking-tight">Loading FoundrAI Boardroom...</p>
                  <p className="text-sm text-muted-foreground">Preparing your executive workspace</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: phase === "authenticating" ? "35%" : phase === "granted" ? "70%" : "100%",
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Toast ─────────────────────────────────────────────── */

function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#0f1117]/95 border border-primary/30 shadow-[0_0_30px_rgba(0,255,255,0.2)] backdrop-blur-xl"
        >
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-white">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function Auth() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoPw, setShowDemoPw]     = useState(false);
  const [loading, setLoading]           = useState(false);
  const [successPhase, setSuccessPhase] = useState<SuccessPhase>(null);
  const [error, setError]               = useState<string | null>(null);
  const [shake, setShake]               = useState(false);
  const [copiedIndex, setCopiedIndex]   = useState<number | null>(null);
  const [toast, setToast]               = useState<string | null>(null);
  const [form, setForm]                 = useState({ email: "", password: "" });

  const demoAccounts = getDemoAccounts();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      triggerShake();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = validateCredentials(form.email, form.password);
      if (user) {
        setLoading(false);
        setSuccessPhase("authenticating");
        setTimeout(() => setSuccessPhase("granted"),  750);
        setTimeout(() => setSuccessPhase("boarding"), 1500);
        setTimeout(() => navigate("/analyze"),         2400);
      } else {
        setLoading(false);
        setError("ACCESS_RESTRICTED");
        triggerShake();
      }
    }, 700);
  };

  const fillCredential = (email: string, password: string) => {
    setForm({ email, password });
    setError(null);
    showToast("Credentials loaded — ready to access");
  };

  const copyEmail = (email: string, idx: number) => {
    navigator.clipboard.writeText(email).catch(() => {});
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <>
      <SuccessOverlay phase={successPhase} />
      <Toast message={toast} />

      <div className="min-h-[100dvh] w-full bg-[#050508] text-foreground overflow-x-hidden relative flex flex-col lg:flex-row">

        {/* ── Animated Background ── */}
        <motion.div
          animate={{ x: [0, 60, -40, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[750px] h-[750px] bg-primary/10 rounded-full blur-[160px] mix-blend-screen pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -50, 70, 0], y: [0, 60, -50, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[750px] h-[750px] bg-secondary/10 rounded-full blur-[160px] mix-blend-screen pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f3e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_110%)]" />
        </div>

        {/* ════════════ LEFT PANEL ════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col justify-between w-1/2 xl:w-[55%] relative z-10 px-16 xl:px-24 py-14"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-transform group-hover:scale-110">
              F
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">FoundrAI</span>
          </Link>

          {/* Center content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary shadow-[0_0_20px_rgba(0,255,255,0.1)]"
            >
              <BrainCircuit className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">AI Executive Boardroom</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h1 className="text-5xl xl:text-[3.75rem] font-black tracking-tight text-white leading-[1.08] mb-5">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                  FoundrAI
                </span>
              </h1>
              <p className="text-lg text-white/55 font-semibold mb-3 tracking-wide">
                Your AI Boardroom for Startup Decisions
              </p>
              <p className="text-[0.95rem] text-muted-foreground leading-relaxed max-w-md">
                Access the AI Executive Boardroom used to evaluate startup ideas across market opportunity, competition, risk, and growth.
              </p>
            </motion.div>

            {/* Feature list */}
            <ul className="space-y-3.5">
              {features.map(({ label, Icon }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.42 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3.5 group cursor-default"
                >
                  <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,255,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.35)] group-hover:bg-primary/25 group-hover:border-primary/40 transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[0.925rem] text-white/75 font-medium group-hover:text-white transition-colors duration-200 tracking-wide">
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Metric cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-1 bg-white/[0.035] border border-white/8 rounded-2xl p-5 text-center hover:bg-white/[0.06] hover:border-primary/25 transition-colors hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] group"
              >
                <div className="text-[1.6rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all">
                  <AnimatedCounter target={m.target} suffix={m.suffix} delay={900 + i * 150} />
                </div>
                <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════════ RIGHT PANEL ════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-start lg:justify-center w-full lg:w-1/2 xl:w-[45%] relative z-10 px-6 sm:px-10 py-14 lg:overflow-y-auto"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,255,255,0.4)]">
              F
            </div>
            <span className="font-bold text-lg tracking-tight text-white">FoundrAI</span>
          </div>

          <div className="w-full max-w-[430px] space-y-5">

            {/* ── Auth Card ── */}
            <motion.div
              variants={shakeVariants}
              animate={shake ? "shake" : "idle"}
              className="relative"
            >
              {/* Gradient border glow */}
              <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-primary/30 via-blue-500/15 to-secondary/20 opacity-60 blur-[0.5px]" />

              <div className="relative bg-[#080b12]/90 border border-white/8 rounded-3xl p-8 sm:p-9 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95),0_0_80px_rgba(0,255,255,0.05)]">
                {/* Top shimmer line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                {/* INVITE ONLY badge — top-right */}
                <div className="absolute top-5 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-primary uppercase">Invite Only</span>
                </div>

                {/* Beta badge + heading */}
                <div className="mb-7 mt-1 pr-28">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 mb-4">
                    <Lock className="w-2.5 h-2.5" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Beta Access</span>
                  </div>
                  <h2 className="text-[1.65rem] font-black text-white leading-tight mb-1.5 tracking-tight">
                    FoundrAI Beta Access
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Exclusive access for approved founders, investors, and partners.
                  </p>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error === "ACCESS_RESTRICTED" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.28 }}
                      className="mb-5 p-4 rounded-2xl bg-rose-500/6 border border-rose-500/30 shadow-[0_0_25px_rgba(239,68,68,0.12)] flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-rose-300 mb-0.5">Access Restricted</p>
                        <p className="text-xs text-rose-400/80 leading-relaxed">
                          FoundrAI is currently invite-only. Please use approved demo credentials.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {error && error !== "ACCESS_RESTRICTED" && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 text-xs text-rose-400 font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-white/50 text-[11px] font-bold uppercase tracking-[0.15em]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@foundrai.ai"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(null); }}
                      className="h-12 bg-black/50 border-white/8 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:shadow-[0_0_20px_rgba(0,255,255,0.15)] rounded-xl placeholder:text-white/15 text-white transition-all duration-300"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-white/50 text-[11px] font-bold uppercase tracking-[0.15em]">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your access password"
                        value={form.password}
                        onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(null); }}
                        className="h-12 bg-black/50 border-white/8 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:shadow-[0_0_20px_rgba(0,255,255,0.15)] rounded-xl placeholder:text-white/15 text-white pr-12 transition-all duration-300"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors duration-200"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="relative group pt-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-50 blur group-hover:opacity-80 transition-opacity duration-300" />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="relative w-full h-12 bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-bold rounded-xl border-0 transition-all hover:scale-[1.015] disabled:opacity-70 disabled:hover:scale-100 overflow-hidden"
                    >
                      {/* Shine sweep */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Authenticating...
                          </>
                        ) : (
                          <>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            Access FoundrAI
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>

                <p className="mt-5 text-center text-xs text-white/25">
                  Use the demo credentials below to explore FoundrAI.
                </p>
              </div>
            </motion.div>

            {/* ── Demo Credentials Panel ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white/[0.018] border border-white/7 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white/30" />
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.22em]">
                      Demo Access Credentials
                    </p>
                  </div>
                  <p className="text-xs text-white/25 ml-5">Click any card to auto-fill login</p>
                </div>
                <button
                  onClick={() => setShowDemoPw((p) => !p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/4 border border-white/8 text-[11px] text-white/50 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all font-semibold tracking-wide"
                >
                  {showDemoPw ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {showDemoPw ? "Hide" : "Show"} Passwords
                </button>
              </div>

              <div className="space-y-2.5">
                {demoAccounts.map((account, idx) => {
                  const s = ROLE_STYLE[account.role] ?? ROLE_STYLE["Founder"];
                  return (
                    <motion.div
                      key={account.email}
                      onClick={() => fillCredential(account.email, account.password)}
                      whileHover={{ scale: 1.018, y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className={`relative cursor-pointer p-4 rounded-2xl border ${s.border} ${s.bg} ${s.glow} transition-shadow group overflow-hidden`}
                    >
                      {/* hover sheen */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-start justify-between relative z-10">
                        <div className="flex-1 min-w-0">
                          {/* Role badge row */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider ${s.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
                              {account.role}
                            </span>
                          </div>
                          <p className="text-[13px] text-white/75 font-mono truncate leading-relaxed">{account.email}</p>

                          <AnimatePresence>
                            {showDemoPw && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden"
                              >
                                <p className={`text-[11px] font-mono mt-1.5 ${s.text} opacity-70`}>
                                  {account.password}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); copyEmail(account.email, idx); }}
                          className="ml-3 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/8 transition-all shrink-0"
                          title="Copy email"
                        >
                          {copiedIndex === idx
                            ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                            : <Copy className="w-3.5 h-3.5" />
                          }
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
