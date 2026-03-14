import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import { MessageCircle, ArrowLeft, Shield, Users, Zap } from "lucide-react";
import Toaster from "../../components/ui/Toaster";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-crypto-dark flex selection:bg-crypto-primary/30 selection:text-slate-900">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-crypto-primary/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-crypto-secondary/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-crypto-primary/10 via-transparent to-crypto-secondary/10"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-200">
                <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <span className="text-2xl font-serif font-semibold text-slate-800 tracking-wide">
                <span className="italic">Cozy</span>{" "}
                <span className="tracking-tight text-gradient">Convo</span>
              </span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-serif font-medium tracking-tight text-slate-800 leading-tight mb-6">
              Your conversations,
              <br />
              <span className="text-gradient">cozy and private.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Sign in to start chatting — simple, comfortable, and built for
              everyday connection.
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
                title: "Private by default",
                desc: "Your chats stay yours.",
              },
              {
                icon: <Users className="w-5 h-5 text-crypto-secondary" />,
                title: "DMs and groups",
                desc: "Talk 1:1 or with your crew.",
              },
              {
                icon: <Zap className="w-5 h-5 text-crypto-accent" />,
                title: "Fast delivery",
                desc: "Messages that show up instantly.",
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-slate-800 font-medium text-sm">
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
          <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] bg-crypto-primary/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] -right-[10%] w-[50%] h-[50%] bg-crypto-secondary/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-700 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-200 mb-4">
              <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-2xl font-serif font-semibold text-slate-800 tracking-wide">
              <span className="italic">Cozy</span>{" "}
              <span className="tracking-tight text-gradient">Convo</span>
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
