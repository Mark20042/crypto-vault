import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, Menu, X, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { logout } from "../../../store/features/authSlice";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "glass-header py-4" : "py-6 bg-transparent"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crypto-primary to-crypto-secondary flex items-center justify-center p-[2px]">
            <div className="w-full h-full bg-crypto-dark rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            Crypto Vault
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#security"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Security
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            About
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-300">
                Hey, <span className="font-medium text-white">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg text-sm font-medium transition-colors border border-white/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/10"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-header border-t border-white/10 py-4 px-6 flex flex-col gap-4 shadow-2xl">
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#security"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Security
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-slate-300 hover:text-white py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <hr className="border-white/10 my-2" />
          {user ? (
            <>
              <span className="text-sm text-slate-300 py-2">
                Hey, <span className="font-medium text-white">{user.name}</span>
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center px-5 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-sm font-medium text-slate-300 hover:text-white py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="w-full text-center px-5 py-3 bg-crypto-primary hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
