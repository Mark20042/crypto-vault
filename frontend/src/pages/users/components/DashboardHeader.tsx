import { useNavigate } from "react-router-dom";
import { MessageCircle, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

interface User {
  id: number;
  name: string;
  email: string;
}

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="glass-header sticky top-0 z-50 px-6 py-2.5 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-9 h-9 rounded-xl  flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          <MessageCircle className="w-4.5 h-4.5 text-emerald-600" />
        </div>
        <span className="text-lg font-serif font-semibold text-slate-800 tracking-wide hidden sm:block">
          <span className="italic">Cozy</span>{" "}
          <span className="tracking-tight text-gradient">Convo</span>
        </span>
      </div>

      {/* Center: Brand Name / Username */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Azore<span className="text-emerald-500">Dev</span>
        </h2>
      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
        <ProfileDropdown user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}
