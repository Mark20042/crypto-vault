import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-crypto-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
      <div
        className="absolute top-1/3 -right-64 w-96 h-96 bg-crypto-secondary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-crypto-accent/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-crypto-accent font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crypto-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crypto-accent"></span>
            </span>
            Crypto Vault v1.0 is Live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            The Future of <span className="text-gradient">Secure</span>
            <br /> Crypto Asset Management
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Store, track, and manage your digital assets with military-grade
            security. Experience the next generation of crypto portfolio
            tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/auth/register"
              className="w-full sm:w-auto px-8 py-4 bg-crypto-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="#features"
              className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
            >
              Explore Features
            </Link>
          </div>

          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 mt-12">
            {[
              { label: "Assets Secured", value: "$2B+" },
              { label: "Active Users", value: "100K+" },
              { label: "Uptime", value: "99.99%" },
              { label: "Countries Supported", value: "150+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <span className="text-3xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
