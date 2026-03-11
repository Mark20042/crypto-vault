import { Shield, Zap, Lock, BarChart3, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: <Shield className="w-6 h-6 text-crypto-primary" />,
        title: "Military-Grade Security",
        description: "Your assets are protected by state-of-the-art encryption and cold storage solutions."
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-crypto-secondary" />,
        title: "Real-time Analytics",
        description: "Track your portfolio performance with advanced charts and real-time market data."
    },
    {
        icon: <Zap className="w-6 h-6 text-crypto-accent" />,
        title: "Instant Transactions",
        description: "Execute trades and transfers with lightning speed across multiple networks."
    },
    {
        icon: <Lock className="w-6 h-6 text-blue-400" />,
        title: "Non-Custodial Control",
        description: "You hold the keys. Complete control over your funds without third-party risk."
    },
    {
        icon: <Smartphone className="w-6 h-6 text-purple-400" />,
        title: "Cross-Platform Access",
        description: "Manage your vault seamlessly from desktop, tablet, or mobile devices."
    },
    {
        icon: <Globe className="w-6 h-6 text-emerald-400" />,
        title: "Global Reach",
        description: "Access borderless finance and interact with DeFi protocols worldwide."
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 relative bg-crypto-dark">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Built for <span className="text-gradient">Performance</span>
                    </h2>
                    <p className="text-slate-400">
                        Everything you need to manage your crypto portfolio securely and efficiently,
                        all in one powerful platform.
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
                            className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
