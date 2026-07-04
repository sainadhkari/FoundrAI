import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Activity, ShieldAlert, TrendingUp, Cpu, PieChart, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden bg-[#050508]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-[grid-drift_20s_linear_infinite]" />
      </div>

      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: [0, -60, 60, 0], y: [0, 60, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[140px] mix-blend-screen" 
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * -500 - 100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div className="container px-6 mx-auto grid xl:grid-cols-2 gap-16 items-center z-10 relative">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="text-xs font-semibold text-white/90 tracking-wider uppercase">FoundrAI v2.0 Online</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
            Build Smarter.<br />
            Decide Faster.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-pulse">Win Bigger.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl font-light">
            10 AI agents analyze your startup idea before you risk capital, time, or execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg bg-white text-black hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 rounded-full font-bold relative group overflow-hidden">
              <span className="relative z-10 flex items-center">Analyze Startup <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white/50 blur-xl group-hover:bg-white/80 transition-all opacity-0 group-hover:opacity-100" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg border-white/10 hover:bg-white/10 bg-black/20 backdrop-blur-md rounded-full text-white">
              <Play className="mr-2 w-5 h-5 text-primary" /> Watch Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative perspective-1000 w-full"
        >
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl bg-[#0a0a0f]/80 border border-white/10 p-8 backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,255,255,0.1)] overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">Project Nova</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live Analysis</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest mb-1">FoundrAI Score</div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 font-mono">82<span className="text-xl text-white/30">/100</span></div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Agent Status */}
              <div className="col-span-1 space-y-3">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Active Agents</div>
                {[
                  { name: "Market Intel", icon: TrendingUp, status: "Done", color: "text-green-400" },
                  { name: "Risk Model", icon: ShieldAlert, status: "Analyzing...", color: "text-primary animate-pulse" },
                  { name: "Tech Scope", icon: Cpu, status: "Analyzing...", color: "text-primary animate-pulse" }
                ].map((agent, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                      <agent.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-white/80">{agent.name}</span>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${agent.color}`}>{agent.status}</span>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="col-span-1 flex flex-col gap-4">
                <div className="bg-black/40 p-4 rounded-lg border border-white/5 flex-1 relative flex items-center justify-center">
                  <div className="absolute top-3 left-3 text-[10px] text-white/50 uppercase tracking-widest">Sentiment</div>
                  {/* SVG Line Chart */}
                  <svg className="w-full h-16 mt-4" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      d="M0,25 C20,25 30,10 50,15 C70,20 80,5 100,5" 
                      fill="none" 
                      stroke="url(#chart-gradient)" 
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--secondary))" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="bg-black/40 p-4 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="text-[10px] text-white/50 uppercase tracking-widest">Confidence</div>
                  {/* Small SVG Pie Chart */}
                  <div className="relative w-10 h-10">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                      <motion.path 
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: "82, 100" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="4" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">82</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-5 mb-8">
              {[
                { label: "Market Fit", score: 92, color: "from-green-500 to-emerald-400" },
                { label: "Competition Index", score: 65, color: "from-yellow-500 to-orange-400" },
                { label: "Risk Factor", score: 38, color: "from-red-500 to-rose-400" }
              ].map((metric, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{metric.label}</span>
                    <span className="text-xs font-mono text-white/90">{metric.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.score}%` }}
                      transition={{ duration: 1.5, delay: 1 + i * 0.2, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${metric.color} shadow-[0_0_10px_currentColor] opacity-80`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Final Verdict */}
            <div className="mt-8 p-5 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom_right,white,transparent)]" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-green-400/80 uppercase font-mono tracking-widest mb-1">Final CEO Verdict</div>
                  <div className="text-lg font-bold text-green-400">HIGH CONVICTION PROCEED</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
