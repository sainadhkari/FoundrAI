import { BrainCircuit, Download, Activity, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActionButtonsProps {
  isDownloading: boolean;
  onDownload: () => void;
}

export default function ActionButtons({ isDownloading, onDownload }: ActionButtonsProps) {
  const navigate = useNavigate();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
      <Button
        onClick={() => navigate("/analyze")}
        size="lg"
        className="w-full sm:w-auto h-14 px-8 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all hover:scale-105 rounded-full font-bold relative group overflow-hidden border-0"
      >
        <BrainCircuit className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
        <span className="relative z-10">Analyze Another Startup</span>
        <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100" />
      </Button>

      <Button
        onClick={onDownload}
        disabled={isDownloading}
        size="lg"
        variant="outline"
        className="w-full sm:w-auto h-14 px-8 text-base border-white/10 hover:bg-white/10 bg-black/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] disabled:opacity-80 disabled:hover:scale-100"
      >
        {isDownloading ? (
          <>
            <Activity className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Download Investor Memo PDF
          </>
        )}
      </Button>

      <Button
        onClick={handleBackToTop}
        size="lg"
        variant="outline"
        className="w-full sm:w-auto h-14 px-8 text-base border-white/10 hover:bg-white/10 bg-black/20 backdrop-blur-md rounded-full text-white transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
      >
        <ArrowUp className="w-5 h-5 mr-2" />
        Back to Top
      </Button>
    </div>
  );
}
