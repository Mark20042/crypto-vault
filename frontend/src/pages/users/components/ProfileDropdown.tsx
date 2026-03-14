import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ProfileDropdownProps {
  user: User;
  onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/80 transition-all group"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1 group-hover:text-emerald-700">Online</p>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 ring-2 ring-white transform group-hover:scale-105 transition-all">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
            <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
          </div>
          
          <div className="p-2 space-y-1">
            <button
              onClick={() => { setIsOpen(false); navigate("/profile"); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              View Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          <div className="p-2 border-t border-slate-50">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
