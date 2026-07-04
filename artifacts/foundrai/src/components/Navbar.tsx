import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[9999] px-6 py-4 flex items-center justify-between border-b border-white/10 bg-background/60 backdrop-blur-2xl shadow-sm"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,255,255,0.4)]">
            F
          </div>
          <span className="font-semibold text-lg tracking-tight">FoundrAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#agents" className="hover:text-white transition-colors">Agents</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-white hover:bg-white/5">
          Login
        </Button>
        <Button className="bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] font-semibold">
          Analyze Startup
        </Button>
      </div>
    </motion.header>
  );
}
