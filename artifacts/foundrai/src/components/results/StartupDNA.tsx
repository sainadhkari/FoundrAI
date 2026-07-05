import { motion } from "framer-motion";
import { Dna, Layers, Activity, TrendingUp, Landmark, Boxes } from "lucide-react";
import { StartupDNA as StartupDNAData } from "@/lib/resultsIntelligence";

interface StartupDNAProps {
  dna: StartupDNAData;
}

export default function StartupDNA({ dna }: StartupDNAProps) {
  const cards = [
    { label: "Category", value: dna.category, icon: Boxes },
    { label: "Stage", value: dna.stage, icon: Layers },
    { label: "Risk Profile", value: dna.riskProfile, icon: Activity },
    { label: "Growth Potential", value: dna.growthPotential, icon: TrendingUp },
    { label: "Fundability", value: dna.fundability, icon: Landmark },
    { label: "Business Model", value: dna.businessModel, icon: Dna },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Dna className="w-5 h-5 text-secondary" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Startup DNA</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-secondary/25 rounded-2xl p-5 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-secondary" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">{card.label}</p>
              </div>
              <p className="text-lg font-bold text-white">{card.value}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
