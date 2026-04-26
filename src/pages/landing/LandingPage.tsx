import { Link } from 'react-router-dom';
import { ArrowRight, Box, CreditCard, Fingerprint, Users, Star } from 'lucide-react';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { GlassCard } from '../../components/ui/GlassCard';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text1">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/50 px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-display-m text-accent tracking-tighter">ASK.</Link>
        
        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-pill bg-surface/50 border border-border">
          <a href="#features" className="text-body-m text-text2 hover:text-text1 transition-colors">Features</a>
          <a href="#how-it-works" className="text-body-m text-text2 hover:text-text1 transition-colors">How it Works</a>
          <Link to="/docs" className="text-body-m text-text2 hover:text-text1 transition-colors">Documentation</Link>
          <Link to="/about" className="text-body-m text-text2 hover:text-text1 transition-colors">About</Link>
          <a href="#faq" className="text-body-m text-text2 hover:text-text1 transition-colors">FAQ</a>
        </div>

        <Link to="/app/dashboard" className="px-6 py-2.5 bg-accent text-bg font-bold rounded-pill hover:bg-accent2 transition-colors text-body-m">
          Get Early Access
        </Link>
      </nav>

      <main>
        {/* SECTION 1 - HERO */}
        <section className="relative pt-32 pb-24 overflow-hidden flex flex-col items-center text-center px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          
          <EyebrowBadge className="mb-8 relative z-10">INTRODUCING ASK.</EyebrowBadge>
          
          <h1 className="text-display-xl max-w-4xl mx-auto mb-6 relative z-10">
            <span className="text-text1 block">Financial freedom,</span>
            <span className="text-accent">the efficient way</span>
          </h1>
          
          <p className="text-body-l text-text2 max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
            Next-generation credit solutions for modern founders and ambitious professionals. No hidden fees, just pure purchasing power. Arriving shortly.
          </p>
          
          <div className="flex items-center gap-4 relative z-10">
            <Link to="/app/dashboard" className="px-8 py-3.5 bg-accent text-bg font-bold rounded-pill hover:bg-accent2 transition-colors text-body-m flex items-center gap-2">
              Get Early Access <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="px-8 py-3.5 bg-transparent text-text1 border border-border rounded-pill hover:bg-surface2 transition-colors text-body-m font-medium">
              Learn More
            </Link>
          </div>
        </section>

        {/* SECTION 2 - LOGOS */}
        <section className="py-12 border-y border-border/50 bg-surface/20 flex flex-col items-center">
          <p className="text-mono text-text3 uppercase tracking-widest mb-8">Already chosen by the leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 w-full max-w-5xl mx-auto px-4">
            {['Pinterest', 'Duolingo', 'J.P. Morgan', 'Revolut', 'Headspace'].map(logo => (
              <span key={logo} className="text-display-m font-bold text-text2 hover:text-text1">{logo}</span>
            ))}
          </div>
        </section>

        {/* SECTION 3 - INTRO */}
        <section className="py-32 px-4 flex flex-col items-center text-center max-w-4xl mx-auto">
          <EyebrowBadge className="mb-8">THE DIFFERENCE</EyebrowBadge>
          <p className="text-[32px] font-sans font-light leading-[1.4] text-text2">
            <span className="text-text1">We know how money moves.</span> Traditional banks are slow, clunky, and filled with hidden costs. You need a card that keeps up with your pace without the red tape. That's where <span className="text-accent font-medium">ASK</span> comes in.
          </p>
        </section>

        {/* SECTION 4 - FEATURES */}
        <section id="features" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <EyebrowBadge className="mb-6">WHAT YOU'LL GET</EyebrowBadge>
            <h2 className="text-display-l">
              <span className="text-text1 block">We resolve the friction associated</span>
              <span className="text-text2">with modern spending.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card 1 */}
            <GlassCard className="p-8 h-[420px] flex flex-col relative overflow-hidden group">
               <div className="flex-1 bg-surface2 rounded-xl border border-border mb-8 p-6 relative overflow-hidden flex items-center justify-center">
                 <div className="bg-surface3 rounded-lg border border-border p-4 shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-label text-accent mb-2">◉ REVIEWED · ◉ NEW</p>
                    <p className="text-body-m">Latest design · Today, 11:50</p>
                 </div>
               </div>
               <h3 className="text-[24px] font-bold mb-2">Titanium-grade security</h3>
               <p className="text-body-m text-text2">Lock your card, generate virtual numbers, and get instant fraud alerts in one tap.</p>
            </GlassCard>

            {/* Card 2 */}
            <GlassCard className="p-8 h-[420px] flex flex-col relative overflow-hidden group">
               <div className="flex-1 bg-surface2 rounded-xl border border-border mb-8 p-6 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 to-transparent">
                  <div className="w-12 h-12 rounded-full bg-accent animate-pulse shadow-[0_0_40px_rgba(200,241,53,0.6)]" />
               </div>
               <h3 className="text-[24px] font-bold mb-2">Limit that grows with you</h3>
               <p className="text-body-m text-text2">Our dynamic credit underwriting looks at your potential, not just your past.</p>
            </GlassCard>

            {/* Card 3 */}
            <GlassCard className="p-8 h-[420px] flex flex-col relative overflow-hidden group">
               <div className="flex-1 bg-surface2 rounded-xl border border-border mb-8 p-6 relative overflow-hidden flex items-center justify-center gap-4">
                  {['Figma', 'Notion', 'Framer', 'X'].map(tool => (
                    <div key={tool} className="w-12 h-12 bg-surface rounded-xl border border-border flex items-center justify-center font-bold text-text3 group-hover:text-text1 transition-colors">
                      {tool[0]}
                    </div>
                  ))}
               </div>
               <h3 className="text-[24px] font-bold mb-2">Seamless Accounting</h3>
               <p className="text-body-m text-text2">Sync every transaction directly with your favorite accounting and ERP tools.</p>
            </GlassCard>

            {/* Card 4 */}
            <GlassCard className="p-8 h-[420px] flex flex-col relative overflow-hidden group">
               <div className="flex-1 bg-surface2 rounded-xl border border-border mb-8 p-6 relative overflow-hidden flex items-center justify-center gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-surface2 bg-surface3 flex items-center justify-center text-text2 ${i !== 1 ? '-ml-4' : ''}`}>
                      <Users className="w-5 h-5" />
                    </div>
                  ))}
               </div>
               <h3 className="text-[24px] font-bold mb-2">Team-wide controls</h3>
               <p className="text-body-m text-text2">Issue physical or virtual cards and set spend limits for your entire team.</p>
            </GlassCard>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
             {['2% Unlimited Cashback', 'Global Concierge', 'No FX Fees', 'Airport Lounge Access', 'Metal Card', 'Instant Credit Line', '24/7 Priority Support'].map(perk => (
               <span key={perk} className="px-4 py-2 rounded-pill bg-surface border border-accent/30 text-accent text-body-m font-medium flex items-center gap-2">
                 <div className="w-1 h-1 rotate-45 bg-accent" />
                 {perk}
               </span>
             ))}
          </div>
        </section>

        {/* SECTION 5 - HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border/50">
           <div className="mb-16">
            <EyebrowBadge className="mb-6">HOW IT WORKS</EyebrowBadge>
            <h2 className="text-display-l">
              <span className="text-text1 block">Financial power,</span>
              <span className="text-text2 italic">delivered in minutes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Box, title: "Apply in 60 seconds", desc: "Fill out a simple digital application with no impact on your credit score to check your offer." },
              { icon: CreditCard, title: "Activate your digital card", desc: "Get instant access to your credit line and start spending online while your metal card ships." },
              { icon: Fingerprint, title: "Unlock premium perks", desc: "Gain access to exclusive rewards, travel insurance, and dedicated financial advisory." }
            ].map((step, i) => (
              <GlassCard key={i} className="p-8">
                 <step.icon className="w-12 h-12 text-accent mb-6" />
                 <h3 className="text-[24px] font-bold mb-3">{step.title}</h3>
                 <p className="text-body-m text-text2 leading-relaxed">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SECTION 6 - TESTIMONIALS */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto bg-surface/20 rounded-[40px] border border-border/50 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 px-8">
            {[
              { company: "Loom", quote: "The most seamless corporate card experience we've ever used. The automated expense tracking saves our team hours every week.", author: "Sarthak Sharma, Head of Engineering" },
              { company: "Intercom", quote: "Finally, a credit provider that understands the scale of a fast-growing tech company. The limits grow as we grow.", author: "Aditi Ghosh, Product Analyst" },
              { company: "Abstract", quote: "Atomic's rewards program is unmatched. We're seeing actual ROI on our everyday operational spend.", author: "Krishna Lodha, Head of Product Design" }
            ].map((t, i) => (
              <div key={i} className="flex flex-col">
                 <div className="text-display-m font-bold text-text2 mb-6">{t.company}</div>
                 <p className="text-body-l leading-relaxed text-text1 mb-6 flex-1">"{t.quote}"</p>
                 <div className="flex gap-1 text-accent mb-4">
                   {[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" className="w-4 h-4" />)}
                 </div>
                 <p className="text-body-m text-text3">{t.author}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-border/50 text-center px-8">
            <div>
              <p className="text-display-l text-text1 mb-2">$50M+</p>
              <p className="text-body-m text-text2">In credit lines issued</p>
            </div>
            <div>
              <p className="text-display-l text-text1 mb-2">0.0%</p>
              <p className="text-body-m text-text2">Foreign transaction fees</p>
            </div>
            <div>
              <p className="text-display-l text-text1 mb-2">4.9/5</p>
              <p className="text-body-m text-text2">Average app store rating</p>
            </div>
          </div>
        </section>

        {/* SECTION 8 - FINAL CTA */}
        <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-24">
          <GlassCard className="p-16 text-center flex flex-col items-center bg-surface2">
            <h2 className="text-display-l mb-4">Elevate the way you manage capital</h2>
            <p className="text-body-l text-text2 max-w-2xl mb-8">
              Get ready to experience high-limit credit and intelligent spend management without the typical banking hurdles. Launching soon.
            </p>
            <Link to="/app/dashboard" className="px-8 py-4 bg-accent text-bg font-bold rounded-pill hover:bg-accent2 transition-colors text-body-l">
              Get Early Access
            </Link>
          </GlassCard>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface/30 py-12 px-6 text-center flex flex-col items-center">
        <span className="text-display-m text-accent tracking-tighter mb-6">ASK.</span>
        <div className="flex gap-6 mb-8">
          <Link to="/" className="text-body-m text-text2 hover:text-text1">Home</Link>
          <Link to="/about" className="text-body-m text-text2 hover:text-text1">About</Link>
          <Link to="/docs" className="text-body-m text-text2 hover:text-text1">Docs</Link>
        </div>
        <p className="text-body-m text-text3">© 2025 ASK. All rights reserved.</p>
      </footer>
    </div>
  );
}
