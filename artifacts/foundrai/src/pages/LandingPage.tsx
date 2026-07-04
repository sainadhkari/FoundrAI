import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Agents from "@/components/Agents";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Agents />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
