import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Mail } from 'lucide-react';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { GlassCard } from '../../components/ui/GlassCard';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-text1 flex flex-col">
      <header className="h-16 border-b border-border flex items-center px-6 sticky top-0 bg-bg/80 backdrop-blur-xl z-50">
        <Link to="/" className="flex items-center gap-2 text-text2 hover:text-text1 transition-colors text-body-m font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="text-display-m text-accent mx-auto absolute left-1/2 -translate-x-1/2">ASK.</span>
      </header>

      <main className="flex-1 py-20 px-6 max-w-5xl mx-auto w-full">
        <section className="text-center mb-24">
          <EyebrowBadge className="mb-6">OUR MISSION</EyebrowBadge>
          <h1 className="text-display-l mb-6 max-w-3xl mx-auto">
            To build financial tools that respect your time and intelligence.
          </h1>
          <p className="text-body-l text-text2 max-w-2xl mx-auto leading-relaxed">
            The modern financial stack is fragmented, slow, and opaque. We're building ASK. to unify your financial life under one beautifully designed, remarkably fast interface.
          </p>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <h3 className="text-display-m mb-4 text-accent">01</h3>
              <h4 className="text-[20px] font-bold mb-3">Radical Transparency</h4>
              <p className="text-body-m text-text2">No hidden fees, no complex reward structures designed to confuse. We believe in clear value exchanges.</p>
            </GlassCard>
            <GlassCard className="p-8">
              <h3 className="text-display-m mb-4 text-accent">02</h3>
              <h4 className="text-[20px] font-bold mb-3">Privacy by Default</h4>
              <p className="text-body-m text-text2">Your data is your own. We process analytics locally wherever possible, keeping your financial footprint secure.</p>
            </GlassCard>
          </div>
        </section>

        <section className="text-center mb-24">
          <h2 className="text-display-m mb-12">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-surface2 border-2 border-border mb-6 flex items-center justify-center grayscale overflow-hidden">
                   <div className="w-full h-full bg-surface3" />
                </div>
                <h4 className="text-[18px] font-bold mb-1">Founder {i}</h4>
                <p className="text-body-m text-text3 mb-4">Engineering & Product</p>
                <div className="flex gap-4 text-text2">
                   <a href="#" className="hover:text-accent transition-colors"><Globe className="w-4 h-4" /></a>
                   <a href="#" className="hover:text-accent transition-colors"><Mail className="w-4 h-4" /></a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface/30 py-8 px-6 text-center flex flex-col items-center">
        <span className="text-display-m text-accent tracking-tighter mb-4">ASK.</span>
        <p className="text-body-m text-text3">© 2025 ASK. All rights reserved.</p>
      </footer>
    </div>
  );
}
