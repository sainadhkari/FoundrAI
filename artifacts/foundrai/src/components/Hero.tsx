import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Activity, ShieldAlert, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] mix-blend-screen" style={{ animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
      </div>

      <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">FoundrOS v2.0 Online</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Your AI Executive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">War Room.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Submit your startup idea. 10 specialized AI agents analyze it from every angle—market, finance, psychology, execution—and return a brutal, unbiased verdict. Proceed, Pivot, or Reject.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-black hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
              Analyze Startup <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-white/10 hover:bg-white/5 bg-transparent backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5 text-primary" /> Watch Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative perspective-1000"
        >
          <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden transform-gpu rotate-y-[-5deg] rotate-x-[5deg]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Project Nova</h3>
                  <p className="text-xs text-muted-foreground">Analysis in progress...</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider">Overall Score</div>
                <div className="text-2xl font-bold text-white font-mono">74/100</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Market Opportunity", score: 92, color: "bg-green-500", icon: TrendingUp },
                { label: "Competitor Threat", score: 85, color: "bg-orange-500", icon: ShieldAlert },
                { label: "Execution Complexity", score: 40, color: "bg-red-500", icon: Activity }
              ].map((metric, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-white/80">{metric.label}</span>
                    </div>
                    <span className="text-sm font-mono text-white">{metric.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.score}%` }}
                      transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                      className={`h-full ${metric.color} shadow-[0_0_10px_currentColor]`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <div className="text-xs text-muted-foreground uppercase font-mono tracking-wider mb-2">Final CEO Verdict</div>
              <div className="inline-block px-4 py-1.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30 animate-pulse">
                PROCEED WITH CAUTION
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
