import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-32 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-primary/20 rounded-[100%] blur-[100px] pointer-events-none" />
      </div>
      
      <div className="container px-6 mx-auto relative z-10 text-center max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Stop wondering. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Start knowing.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mb-10"
        >
          Drop your pitch deck or idea description into the War Room. Get a comprehensive 30-page analysis and definitive verdict in 60 seconds.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button size="lg" className="h-16 px-10 text-lg bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all hover:scale-105 rounded-full font-bold">
            Initialize War Room
          </Button>
          <p className="mt-4 text-xs text-muted-foreground font-mono">No credit card required for first analysis.</p>
        </motion.div>
      </div>
    </section>
  );
}
