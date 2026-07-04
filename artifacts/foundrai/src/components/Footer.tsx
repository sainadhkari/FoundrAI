export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-black/50">
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white text-[10px]">
            F
          </div>
          <span className="font-semibold text-sm text-white">FoundrAI</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
