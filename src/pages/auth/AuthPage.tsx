import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { GlassCard } from '../../components/ui/GlassCard';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { full_name: name }
          }
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-display-m text-accent tracking-tighter mb-6">ASK.</span>
          <EyebrowBadge className="mb-4">{isLogin ? 'WELCOME BACK' : 'GET STARTED'}</EyebrowBadge>
          <h1 className="text-display-m">{isLogin ? 'Sign in to your account' : 'Create your free account'}</h1>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-label text-text3 flex items-center gap-2">
                  <UserIcon className="w-3 h-3" /> FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Chen"
                  className="w-full bg-surface2 border border-border rounded-input px-4 py-2.5 text-text1 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-label text-text3 flex items-center gap-2">
                <Mail className="w-3 h-3" /> EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full bg-surface2 border border-border rounded-input px-4 py-2.5 text-text1 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-label text-text3 flex items-center gap-2">
                <Lock className="w-3 h-3" /> PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface2 border border-border rounded-input px-4 py-2.5 text-text1 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {error && (
              <p className="text-danger text-body-m bg-danger/10 p-3 rounded-badge border border-danger/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent hover:bg-accent2 text-bg font-bold rounded-btn transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-body-m text-text2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </GlassCard>

        <p className="text-center text-[11px] text-text3 mt-8">
          By continuing, you agree to ASK.'s Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
