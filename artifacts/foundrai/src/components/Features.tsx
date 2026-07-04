import { motion } from "framer-motion";
import { Brain, Target, Zap, BarChart3, Users, Scale } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Unbiased Intelligence",
    description: "Your friends will lie to you. The market won't. Get cold, hard facts before you waste years building the wrong thing."
  },
  {
    icon: Target,
    title: "Precision Competitor Mapping",
    description: "We don't just find your competitors. We analyze their pricing, weaknesses, and exactly how you can crush them."
  },
  {
    icon: Zap,
    title: "Instant Go-To-Market",
    description: "Stop guessing your channels. Our Growth Agent calculates the highest-ROI acquisition strategies for your specific niche."
  },
  {
    icon: BarChart3,
    title: "Financial Risk Modeling",
    description: "Simulate runway, burn rate, and profitability timelines before you spend a single dollar."
  },
  {
    icon: Users,
    title: "Psychological Profiling",
    description: "Understand your ideal customer's deepest pain points and exactly what messaging will convert them."
  },
  {
    icon: Scale,
    title: "Execution Complexity",
    description: "A realistic assessment of technical debt, regulatory hurdles, and operational drag."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Don't build in an echo chamber.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xl leading-relaxed"
          >
            FoundrAI is your AI boardroom of 10 specialized agents that pressure-test startup ideas before execution.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/[0.06] hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.25)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-primary/10 group-hover:border-primary/30 shadow-[0_0_15px_rgba(0,255,255,0)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed group-hover:text-white/80 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
