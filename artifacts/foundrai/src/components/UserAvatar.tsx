import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { getUser, logout } from "@/hooks/useAuth";

const ROLE_COLORS: Record<string, string> = {
  Founder: "bg-primary/20 text-primary border-primary/30",
  Investor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Admin: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function UserAvatar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = getUser();

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!user) return null;

  const initial = user.name?.[0]?.toUpperCase() ?? "U";
  const roleBadgeClass = ROLE_COLORS[user.role] ?? "bg-white/10 text-white/60 border-white/20";

  return (
    <div className="flex items-center gap-2.5" ref={ref}>
      {/* Role badge */}
      <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide ${roleBadgeClass}`}>
        {user.role}
      </span>

      {/* Avatar button */}
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:scale-110 transition-transform focus:outline-none"
          aria-label="User menu"
        >
          {initial}
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-56 bg-[#0a0a0f]/98 border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl z-50">
            <div className="px-3 py-2.5 mb-1 border-b border-white/5">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${roleBadgeClass}`}>
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => {
                setOpen(false);
                logout();
                navigate("/");
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
