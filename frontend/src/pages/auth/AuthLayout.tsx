import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import { Wallet, ArrowLeft, Shield, BarChart3, Zap } from "lucide-react";
import Toaster from "../../components/ui/Toaster";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-crypto-dark flex selection:bg-crypto-primary/30 selection:text-white">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-crypto-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-crypto-secondary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-crypto-primary/5 via-transparent to-crypto-secondary/5"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crypto-primary to-crypto-secondary flex items-center justify-center p-[2px]">
                <div className="w-full h-full bg-crypto-dark rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                Crypto Vault
              </span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Your Digital Assets,
              <br />
              <span className="text-gradient">Secured Forever.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              Join thousands of users who trust Crypto Vault to protect and
              manage their cryptocurrency portfolio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            {[
              {
                icon: <Shield className="w-5 h-5 text-crypto-primary" />,
                title: "Military-Grade Encryption",
                desc: "Your keys, your control. Always.",
              },
              {
                icon: <BarChart3 className="w-5 h-5 text-crypto-secondary" />,
                title: "Real-time Portfolio Tracking",
                desc: "Live analytics and market insights.",
              },
              {
                icon: <Zap className="w-5 h-5 text-crypto-accent" />,
                title: "Lightning-Fast Transactions",
                desc: "Execute trades in milliseconds.",
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] bg-crypto-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] -right-[10%] w-[50%] h-[50%] bg-crypto-secondary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crypto-primary to-crypto-secondary flex items-center justify-center p-[2px] mb-4">
              <div className="w-full h-full bg-crypto-dark rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Crypto Vault
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-2xl p-8"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
