import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { AlertTriangle, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Razorpay type declaration
declare var Razorpay: any;

function AnimatedToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-accent' : 'bg-surface3'}`}
      onClick={() => onChange(!enabled)}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-block h-4 w-4 rounded-full bg-bg shadow-sm"
        style={{ marginLeft: enabled ? '24px' : '4px' }}
      />
    </button>
  );
}

export function Profile() {
  const { user, updateUser, resetData, session } = useFinanceStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [alerts, setAlerts] = useState({ anomaly: true, weekly: false, budget: true });
  const [billingLoading, setBillingLoading] = useState(false);

  const userName = session?.user?.user_metadata?.full_name || user.name;
  const userEmail = session?.user?.email || 'hello@example.com';

  const handleCurrencyChange = (c: 'USD' | 'EUR' | 'GBP' | 'INR') => updateUser({ currency: c });

  const handleUpgrade = async () => {
    setBillingLoading(true);
    
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Demo Mode: If key is missing or placeholder, simulate success
    if (!razorpayKey || razorpayKey === 'your_razorpay_key_id' || razorpayKey.startsWith('sb_publishable')) {
      setTimeout(() => {
        alert('DEMO MODE: Payment Successful! (Simulated)');
        setBillingLoading(false);
      }, 1500);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: 1200, // Amount in paise (1200 paise = ₹12)
      currency: "INR",
      name: "ASK. Finance",
      description: "Pro Plan Subscription",
      image: "https://ojbzfynwckkqwxwuatag.supabase.co/storage/v1/object/public/assets/logo.png", // Replace with your logo
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Here you would typically send the response to your backend
      },
      prefill: {
        name: userName,
        email: userEmail,
      },
      theme: {
        color: "#c8f135",
      },
    };

    try {
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Razorpay failed to open:', err);
      alert('Failed to initialize Razorpay. Ensure the script is loaded.');
    } finally {
      setBillingLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
      <header className="mb-4">
        <EyebrowBadge className="mb-4">PREFERENCES</EyebrowBadge>
        <h1 className="text-display-l mb-2">Profile & Settings</h1>
        <p className="text-body-l text-text2 max-w-2xl">
          Manage your personal details, regional preferences, and subscription plan.
        </p>
      </header>

      <GlassCard className="p-8 flex flex-col md:flex-row items-center gap-8 mb-6">
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(200,241,53,0.3)]">
           <span className="text-display-m font-extrabold text-bg">{userName.split(' ').map((n: string) => n[0]).join('')}</span>
        </div>
        <div className="flex-1 w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-label text-text3">FULL NAME</label>
              <input 
                type="text" 
                readOnly
                value={userName}
                className="w-full bg-surface2 border border-border rounded-input px-4 py-2.5 text-text1 focus:outline-none opacity-80"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-label text-text3">EMAIL ADDRESS</label>
              <input 
                type="email" 
                readOnly
                value={userEmail}
                className="w-full bg-surface2 border border-border rounded-input px-4 py-2.5 text-text1 focus:outline-none opacity-80"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Billing Section */}
      <GlassCard className="p-8 border-accent/20 bg-accent/5 overflow-hidden relative group mb-6">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap className="w-32 h-32 text-accent" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-display-m text-[24px]">ASK. Pro Plan</h3>
                <span className="px-2 py-1 bg-accent text-bg text-[10px] font-bold rounded-pill uppercase">Current: Free</span>
              </div>
              <p className="text-body-l text-text2 max-w-md mb-6">
                Unlock advanced AI insights, unlimited CSV uploads, and real-time bank syncing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                {['Unlimited Transactions', 'Advanced Anomaly Detection', 'Priority AI Support', 'Custom Export Formats'].map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-body-m text-text1">
                    <Check className="w-4 h-4 text-accent" /> {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 bg-bg/50 backdrop-blur-md p-6 rounded-card border border-border min-w-[200px]">
               <div className="text-center">
                 <span className="text-display-m text-accent">₹99</span>
                 <span className="text-text3 text-body-m">/month</span>
               </div>
               <button 
                 onClick={handleUpgrade}
                 disabled={billingLoading}
                 className="w-full py-3 bg-accent hover:bg-accent2 text-bg font-bold rounded-btn transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 {billingLoading ? 'Loading...' : 'Upgrade Now'}
                 <Zap className="w-4 h-4 fill-current" />
               </button>
               <p className="text-[10px] text-text3 text-center">Secure checkout via Razorpay</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-[18px] font-bold mb-1">Financial Baseline</h3>
            <p className="text-body-m text-text3">Used to calculate your AI Score and savings rate.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-label text-text3">MONTHLY INCOME</label>
              <span className="text-mono text-accent">${user.income.toLocaleString()}/mo</span>
            </div>
            <input 
              type="range" 
              min="1000" max="20000" step="500"
              value={user.income}
              onChange={(e) => updateUser({ income: parseInt(e.target.value) })}
              className="w-full accent-accent h-1.5 bg-surface3 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
             <label className="text-label text-text3">PREFERRED CURRENCY</label>
             <div className="flex bg-surface2 rounded-btn p-1 border border-border">
               {(['USD', 'EUR', 'GBP', 'INR'] as const).map(c => (
                 <button 
                   key={c}
                   onClick={() => handleCurrencyChange(c)}
                   className={`flex-1 py-1.5 rounded-pill text-body-m font-medium transition-colors ${user.currency === c ? 'bg-surface border border-border shadow-sm text-text1' : 'text-text3 hover:text-text2'}`}
                 >
                   {c}
                 </button>
               ))}
             </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-[18px] font-bold mb-1">Notifications</h3>
            <p className="text-body-m text-text3">Manage how and when ASK. alerts you.</p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-m font-medium text-text1">Spending anomaly alerts</p>
                <p className="text-[12px] text-text3 mt-0.5">Get notified about unusual spikes.</p>
              </div>
              <AnimatedToggle enabled={alerts.anomaly} onChange={(v) => setAlerts(a => ({...a, anomaly: v}))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-m font-medium text-text1">Weekly summary email</p>
                <p className="text-[12px] text-text3 mt-0.5">A digest of your financial progress.</p>
              </div>
              <AnimatedToggle enabled={alerts.weekly} onChange={(v) => setAlerts(a => ({...a, weekly: v}))} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-m font-medium text-text1">Budget warnings</p>
                <p className="text-[12px] text-text3 mt-0.5">Alerts when nearing limits.</p>
              </div>
              <AnimatedToggle enabled={alerts.budget} onChange={(v) => setAlerts(a => ({...a, budget: v}))} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="col-span-1 md:col-span-2 p-6 border-danger/20 bg-danger/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-danger flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Danger Zone
              </h3>
              <p className="text-body-m text-text2 mt-1">Reset all data, clear transactions, and reload mock defaults.</p>
            </div>
            {!showConfirm ? (
              <button 
                onClick={() => setShowConfirm(true)}
                className="px-6 py-2 border border-danger text-danger hover:bg-danger hover:text-white rounded-btn font-medium transition-colors whitespace-nowrap"
              >
                Reset all data
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 border border-border text-text2 hover:text-text1 rounded-btn font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    resetData();
                    setShowConfirm(false);
                  }}
                  className="px-6 py-2 bg-danger text-white rounded-btn font-medium transition-colors"
                >
                  Confirm Reset
                </button>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
