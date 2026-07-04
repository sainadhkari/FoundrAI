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
    <section id="features" className="py-24 relative">
      <div className="container px-6 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Don't build in an echo chamber.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            A board of 10 specialized AI directors operating in milliseconds, saving you months of wasted effort.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
