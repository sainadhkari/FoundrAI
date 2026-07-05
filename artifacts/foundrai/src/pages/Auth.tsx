import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  BrainCircuit,
  Eye,
  EyeOff,
  Github,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/hooks/useAuth";

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

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSocialAuth = (provider: "google" | "github") => {
    setSocialLoading(provider);
    const name = provider === "google" ? "Google User" : "GitHub User";
    const email = provider === "google" ? "founder@gmail.com" : "founder@github.com";
    setTimeout(() => {
      login(name, email);
      navigate("/analyze");
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "signup" && !form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const displayName =
      mode === "signup"
        ? form.name.trim()
        : form.email.split("@")[0];
    setTimeout(() => {
      login(displayName, form.email.trim());
      navigate("/analyze");
    }, 900);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#050508] text-foreground overflow-hidden relative flex">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-secondary/15 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f3e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_110%)]" />
      </div>

      {/* ===== LEFT SIDE ===== */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col justify-between w-1/2 xl:w-[55%] relative z-10 px-16 xl:px-24 py-14"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-transform group-hover:scale-105">
            F
          </div>
          <span className="font-bold text-xl tracking-tight text-white">FoundrAI</span>
        </Link>

        {/* Center content */}
        <div className="space-y-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary"
          >
            <BrainCircuit className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">AI Executive Boardroom</span>
          </motion.div>

          {/* Heading */}
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

          {/* Feature bullets */}
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

        {/* Metrics row */}
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
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] transition-all">
                {m.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium leading-tight">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ===== RIGHT SIDE ===== */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center w-full lg:w-1/2 xl:w-[45%] relative z-10 px-6 sm:px-10 py-14"
      >
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,255,255,0.4)]">
            F
          </div>
          <span className="font-bold text-lg tracking-tight text-white">FoundrAI</span>
        </div>

        {/* Auth card */}
        <div className="w-full max-w-[420px]">
          <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05),0_0_60px_rgba(0,255,255,0.05)]">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Card header */}
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-white mb-1.5">Get Started</h2>
              <p className="text-sm text-muted-foreground">
                Create your account or sign in to continue.
              </p>
            </div>

            {/* Social buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                onClick={() => handleSocialAuth("google")}
                disabled={loading || socialLoading !== null}
                className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-60"
              >
                {socialLoading === "google" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <svg className="w-4 h-4 mr-2.5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                Continue with Google
              </Button>

              <Button
                type="button"
                onClick={() => handleSocialAuth("github")}
                disabled={loading || socialLoading !== null}
                className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-60"
              >
                {socialLoading === "github" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Github className="w-4 h-4 mr-2.5" />
                )}
                Continue with GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1.5 pb-0.5">
                      <Label htmlFor="name" className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="h-12 bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 rounded-xl placeholder:text-white/20 text-white transition-all"
                        autoComplete="name"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="founder@startup.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-12 bg-black/40 border-white/10 focus-visible:border-primary focus-visible:ring-primary/30 rounded-xl placeholder:text-white/20 text-white pr-12 transition-all"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
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

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-rose-400 font-medium pt-0.5"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading || socialLoading !== null}
                className="w-full h-12 mt-1 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white font-bold rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.25)] hover:shadow-[0_0_50px_rgba(0,255,255,0.4)] transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 border-0 relative group overflow-hidden"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                )}
                {mode === "signup" ? "Create Account" : "Sign In"}
                <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </form>

            {/* Toggle mode */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signup" ? "signin" : "signup");
                  setError(null);
                }}
                className="text-sm text-muted-foreground hover:text-white transition-colors"
              >
                {mode === "signup" ? (
                  <>Already have an account? <span className="text-primary font-semibold">Sign In</span></>
                ) : (
                  <>Don't have an account? <span className="text-primary font-semibold">Create Account</span></>
                )}
              </button>
            </div>

            {/* Legal */}
            <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
              By continuing, you agree to FoundrAI{" "}
              <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">Terms</span>{" "}
              and{" "}
              <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
