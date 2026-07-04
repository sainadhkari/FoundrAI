import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-40 relative flex items-center justify-center overflow-hidden border-t border-white/10 bg-[#050508]">
      {/* Intense Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1200px] h-[800px] bg-gradient-to-r from-primary/40 via-secondary/30 to-primary/40 rounded-[100%] blur-[160px]" 
        />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] z-0" />
      
      <div className="container px-6 mx-auto relative z-10 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight"
        >
          Ready to pressure-test <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">your startup?</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl text-muted-foreground mb-16 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Get strategic clarity before you commit time, capital, and execution.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative group inline-block">
            {/* Pulsing Backglow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
            <Button size="lg" className="relative h-20 px-16 text-xl bg-white text-black hover:bg-gray-100 shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-all hover:scale-105 rounded-full font-bold uppercase tracking-wider border-[3px] border-transparent bg-clip-padding">
              Launch FoundrAI
            </Button>
          </div>
          <p className="mt-10 text-sm text-white/50 font-mono uppercase tracking-widest font-semibold">No credit card required for first analysis</p>
        </motion.div>
      </div>
    </section>
  );
}
