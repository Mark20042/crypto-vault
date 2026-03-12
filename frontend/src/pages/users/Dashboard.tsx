import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchSession, logout } from "../../store/features/authSlice";
import { motion } from "framer-motion";
import { Wallet, LogOut, Mail, User, Shield, Loader2 } from "lucide-react";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(fetchSession()).unwrap().catch(() => {
                navigate("/auth/login");
            });
        }
    }, [dispatch, user, navigate]);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/");
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-crypto-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-crypto-dark relative overflow-hidden selection:bg-crypto-primary/30 selection:text-white">
          
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-5%] -right-[10%] w-[40%] h-[40%] bg-crypto-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-5%] -left-[10%] w-[40%] h-[40%] bg-crypto-secondary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
            </div>

          
            <header className="glass-header sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-crypto-primary to-crypto-secondary flex items-center justify-center p-[2px]">
                            <div className="w-full h-full bg-crypto-dark rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                <Wallet className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <span className="text-lg font-bold text-white">Crypto Vault</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg text-sm font-medium transition-all border border-white/10"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

          
            <main className="container mx-auto px-6 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Welcome */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back, <span className="text-gradient">{user.name}</span>
                        </h1>
                        <p className="text-slate-400">Here's a snapshot of your vault status.</p>
                    </div>

                 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-panel rounded-2xl p-6 space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-crypto-primary/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-crypto-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Name</p>
                                    <p className="text-white font-semibold">{user.name}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-panel rounded-2xl p-6 space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-crypto-secondary/20 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-crypto-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Email</p>
                                    <p className="text-white font-semibold">{user.email}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-panel rounded-2xl p-6 space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-crypto-accent/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-crypto-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Status</p>
                                    <p className="text-crypto-accent font-semibold">Vault Secured</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                   
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-panel rounded-2xl p-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-6">Account Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-slate-400 text-sm">User ID</span>
                                <span className="text-white font-mono text-sm bg-white/5 px-3 py-1 rounded-lg">{user.id}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-slate-400 text-sm">Display Name</span>
                                <span className="text-white text-sm">{user.name}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/5">
                                <span className="text-slate-400 text-sm">Email Address</span>
                                <span className="text-white text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-slate-400 text-sm">Session</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-crypto-accent animate-pulse"></span>
                                    <span className="text-crypto-accent text-sm font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
