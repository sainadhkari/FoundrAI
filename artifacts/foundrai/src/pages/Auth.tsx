import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateCredentials, getDemoAccounts } from "@/hooks/useAuth";

const features = [
  "Market Opportunity Analysis",
  "Competitor Intelligence",
  "Financial Risk Modeling",
  "Growth Strategy",
  "CEO-Level Strategic Verdict",
];

const metrics = [
  { value: "1000+", label: "Startup Analyses" },
  { value: "92%", label: "Founder Satisfaction" },
  { value: "10", label: "AI Agents" },
];

const ROLE_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Founder: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/25",
    glow: "hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]",
  },
  Investor: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/25",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  Admin: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/25",
    glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
};

export default function Auth() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoPw, setShowDemoPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const demoAccounts = getDemoAccounts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = validateCredentials(form.email, form.password);
      if (user) {
        navigate("/analyze");
      } else {
        setLoading(false);
        setError("ACCESS_RESTRICTED");
      }
    }, 700);
  };

  const fillCredential = (email: string, password: string) => {
    setForm({ email, password });
    setError(null);
  };

  const copyEmail = (email: string, idx: number) => {
    navigator.clipboard.writeText(email).catch(() => {});
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#050508] text-foreground overflow-x-hidden relative flex flex-col lg:flex-row">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary/12 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-secondary/12 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-700/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-12 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f3e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_110%)]" />
      </div>

      {/* ===== LEFT SIDE ===== */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col justify-between w-1/2 xl:w-[55%] relative z-10 px-16 xl:px-24 py-14"
      >
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-transform group-hover:scale-105">
            F
          </div>
          <span className="font-bold text-xl tracking-tight text-white">FoundrAI</span>
        </Link>

        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary"
          >
            <BrainCircuit className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">AI Executive Boardroom</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">
                FoundrAI
              </span>
            </h1>
            <p className="text-xl text-white/60 font-medium mb-3">
              Your AI Boardroom for Startup Decisions
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Validate startup ideas with 10 specialized AI agents before risking time, capital, or execution.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,255,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,255,255,0.35)] transition-all">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-white/80 font-medium group-hover:text-white transition-colors">{f}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-6"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="flex-1 bg-white/[0.03] border border-white/8 rounded-2xl p-5 text-center hover:bg-white/[0.05] hover:border-primary/20 transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.08)] group"
            >
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1">
                {m.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ===== RIGHT SIDE ===== */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-start lg:justify-center w-full lg:w-1/2 xl:w-[45%] relative z-10 px-6 sm:px-10 py-14 lg:overflow-y-auto"
      >
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,255,255,0.4)]">
            F
          </div>
          <span className="font-bold text-lg tracking-tight text-white">FoundrAI</span>
        </div>

        <div className="w-full max-w-[420px] space-y-6">

          {/* ── Auth Card ── */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05),0_0_60px_rgba(0,255,255,0.04)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Beta badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400">
                <Lock className="w-3 h-3" />
                <span className="text-[11px] font-bold tracking-widest uppercase">Invite Only · Beta</span>
              </div>
            </div>

            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-white mb-1.5">FoundrAI Beta Access</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Exclusive access for approved founders, investors, and partners.
              </p>
            </div>

            {/* Error block */}
            <AnimatePresence>
              {error === "ACCESS_RESTRICTED" && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="mb-5 p-4 rounded-xl bg-rose-500/8 border border-rose-500/25 flex items-start gap-3"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@foundrai.ai"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(null); }}
                  className="h-12 bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 rounded-xl placeholder:text-white/20 text-white transition-all"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your access password"
                    value={form.password}
                    onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(null); }}
                    className="h-12 bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 rounded-xl placeholder:text-white/20 text-white pr-12 transition-all"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-1 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white font-bold rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,255,255,0.35)] transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 border-0 relative group overflow-hidden"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                )}
                {loading ? "Verifying Access..." : "Access FoundrAI"}
                <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Use the demo credentials below to explore FoundrAI.
            </p>
          </div>

          {/* ── Demo Credentials Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative bg-white/[0.02] border border-white/8 rounded-3xl p-6 backdrop-blur-xl"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-0.5">
                  Demo Access Credentials
                </p>
                <p className="text-xs text-muted-foreground">Click any card to auto-fill login</p>
              </div>
              <button
                onClick={() => setShowDemoPw((p) => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all font-medium"
              >
                {showDemoPw ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showDemoPw ? "Hide" : "Show"} Passwords
              </button>
            </div>

            <div className="space-y-3">
              {demoAccounts.map((account, idx) => {
                const colors = ROLE_COLORS[account.role] ?? ROLE_COLORS["Founder"];
                return (
                  <motion.div
                    key={account.email}
                    onClick={() => fillCredential(account.email, account.password)}
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full cursor-pointer p-4 rounded-2xl border ${colors.border} ${colors.bg} ${colors.glow} transition-all group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>
                            {account.label}
                          </span>
                        </div>
                        <p className="text-sm text-white/80 font-mono truncate">{account.email}</p>
                        <AnimatePresence>
                          {showDemoPw && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-white/40 font-mono mt-1 overflow-hidden"
                            >
                              {account.password}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); copyEmail(account.email, idx); }}
                        className="ml-3 p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/10 transition-all shrink-0"
                        title="Copy email"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
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
  );
}
