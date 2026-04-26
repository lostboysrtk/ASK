import { Navigate, Outlet } from 'react-router-dom';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function ProtectedRoute() {
  const { session, setSession, isLoading } = useFinanceStore();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
