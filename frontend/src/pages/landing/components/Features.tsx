import {
  Shield,
  Zap,
  Lock,
  Users,
  Smartphone,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-crypto-primary" />,
    title: "Private by Design",
    description:
      "Keep your conversations protected with strong security and sensible defaults.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-crypto-secondary" />,
    title: "Realtime Messaging",
    description:
      "Send messages instantly with smooth, responsive conversations.",
  },
  {
    icon: <Zap className="w-6 h-6 text-crypto-accent" />,
    title: "Fast Delivery",
    description:
      "Low-latency chats that feel great — even on slower connections.",
  },
  {
    icon: <Lock className="w-6 h-6 text-blue-400" />,
    title: "Secure Sessions",
    description: "Sign in confidently and keep your account protected.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    title: "Cross-Device Friendly",
    description: "A comfortable experience on desktop, tablet, or mobile.",
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: "DMs & Groups",
    description:
      "From 1:1 chats to group conversations, stay connected your way.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-crypto-dark">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-slate-800">
            Built for <span className="text-gradient">Conversation</span>
          </h2>
          <p className="text-slate-600">
            Everything you need for a cozy chat experience — simple, fast, and
            secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
