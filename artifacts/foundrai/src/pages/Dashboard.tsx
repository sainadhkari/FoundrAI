import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[#050508] text-foreground flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full text-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-12 shadow-[0_0_60px_rgba(80,80,255,0.08)]"
      >
        <div className="mx-auto mb-6 w-14 h-14 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(0,255,255,0.35)]">
          F
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Dashboard Coming Soon</h1>
        <p className="text-muted-foreground mb-8">
          Your AI Boardroom results will appear here once analysis is complete.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
