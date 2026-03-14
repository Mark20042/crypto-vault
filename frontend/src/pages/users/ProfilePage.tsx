import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/utils/thunk";
import { fetchSession } from "../../store/features/authSlice";
import { MessageCircle, ArrowLeft, Mail, Calendar, Shield, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchSession())
        .unwrap()
        .catch(() => {
          navigate("/auth/login");
        });
    }
  }, [dispatch, user, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-crypto-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Minimal Top Bar */}
      <header className="glass-header sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/dashboard")}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-200 shadow-sm transition-transform group-hover:scale-105">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-xl font-serif font-semibold text-slate-800 tracking-wide hidden sm:block">
            <span className="italic">Cozy</span>{" "}
            <span className="tracking-tight text-gradient">Convo</span>
          </span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </button>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto max-w-2xl px-4 py-12">
        <div className="glass-panel rounded-2xl overflow-hidden">
          {/* Cover + Avatar */}
          <div className="h-32 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-4xl font-bold ring-4 ring-white shadow-xl shadow-emerald-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-16 pb-8 px-8">
            <h1 className="text-2xl font-serif font-semibold text-slate-800">{user.name}</h1>
            <p className="text-emerald-600 font-medium mt-1">Online</p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
                  <p className="text-slate-800 font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Member Since</p>
                  <p className="text-slate-800 font-medium">March 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Account ID</p>
                  <p className="text-slate-800 font-medium font-mono text-sm">{user.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
