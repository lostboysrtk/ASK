import { Bell, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useFinanceStore } from '../../store/useFinanceStore';

export function TopHeader() {
  const location = useLocation();
  const { session, signOut } = useFinanceStore();
  
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email || 'User';
  
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path || path === 'dashboard') return 'Dashboard';
    if (path === 'ask-ai') return 'Ask AI';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-bg border-b border-border sticky top-0 z-40 hidden md:flex">
      <h1 className="text-display-m text-text1 text-[20px]">{getPageTitle()}</h1>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-text2 hover:text-text1 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
             <span className="text-bg text-mono font-bold uppercase">{userName.slice(0, 2)}</span>
          </div>
          <button 
            onClick={() => signOut()}
            className="p-2 text-text3 hover:text-danger transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
