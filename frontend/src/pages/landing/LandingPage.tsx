import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-crypto-dark flex flex-col font-sans selection:bg-crypto-primary/30 selection:text-slate-900">
      <Navbar />

      <main className="grow">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
