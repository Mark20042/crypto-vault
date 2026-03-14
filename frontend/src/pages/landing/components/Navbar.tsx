import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, Menu, X, LogOut, User as UserIcon, LayoutDashboard, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { logout } from "../../../store/features/authSlice";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "glass-header py-4" : "py-6 bg-transparent"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center transition-colors duration-300">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <span className="text-xl font-serif font-semibold text-slate-800 tracking-wide">
            <span className="italic">Cozy</span>{" "}
            <span className="tracking-tight text-gradient">Convo</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
          >
            Features
          </a>
          <a
            href="#security"
            className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
          >
            Security
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
          >
            About
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-500/20"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-white/80 transition-all border border-transparent hover:border-slate-200 hover:shadow-sm"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 ring-2 ring-white text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                      <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => { setIsProfileOpen(false); navigate("/profile"); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        View Profile
                      </button>
                    </div>
                    <div className="p-2 border-t border-slate-50">
                      <button
                        onClick={() => { setIsProfileOpen(false); handleLogout(); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-emerald-500/20"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-600 hover:text-emerald-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-header border-t border-emerald-100 py-4 px-6 flex flex-col gap-4 shadow-2xl">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-700 py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#security" className="text-sm font-medium text-slate-600 hover:text-emerald-700 py-2" onClick={() => setIsMobileMenuOpen(false)}>Security</a>
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-emerald-700 py-2" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <hr className="border-slate-200 my-2" />
          {user ? (
            <>
              <Link to="/dashboard" className="w-full text-center px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link to="/profile" className="w-full text-center px-5 py-3 bg-white hover:bg-emerald-50 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <UserIcon className="w-4 h-4" />
                View Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full text-center px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="text-sm font-medium text-slate-600 hover:text-emerald-700 py-2" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/auth/register" className="w-full text-center px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors mt-2 shadow-sm shadow-emerald-500/20" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
