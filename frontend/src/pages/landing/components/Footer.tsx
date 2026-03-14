import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-xl font-serif font-semibold text-slate-800 tracking-wide">
                <span className="italic">Cozy</span>{" "}
                <span className="tracking-tight text-gradient">Convo</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              A cozy place to talk — built for quick check-ins, deep
              conversations, and everything in between.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-800 font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-800 font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-800 font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-crypto-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Cozy Convo. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>for cozy chats</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
