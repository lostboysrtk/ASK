import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Receipt, CreditCard, Target, RefreshCw, MessageSquare, User, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useFinanceStore } from '../../store/useFinanceStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard' },
  { icon: Receipt, label: 'Expenses', path: '/app/expenses' },
  { icon: CreditCard, label: 'Cards Advisor', path: '/app/cards' },
  { icon: Target, label: 'Budget Planner', path: '/app/budgets' },
  { icon: RefreshCw, label: 'Subscriptions', path: '/app/subscriptions' },
  { icon: MessageSquare, label: 'Ask AI', path: '/app/ask-ai' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, session, signOut } = useFinanceStore();
  
  const userName = session?.user?.user_metadata?.full_name || user.name;

  return (
    <aside 
      className={cn(
        "fixed md:relative z-50 flex flex-col h-screen bg-surface border-r border-border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bottom-0 md:bottom-auto w-full md:w-auto flex-row md:flex-col",
        isExpanded ? "md:w-[220px]" : "md:w-[64px]"
      )}
    >
      <div className="hidden md:flex h-16 items-center px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <span className={cn("text-display-m text-accent tracking-tighter truncate transition-all group-hover:opacity-80", isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden")}>ASK.</span>
          {!isExpanded && <span className="text-display-m text-accent mx-auto group-hover:opacity-80">A.</span>}
        </Link>
      </div>

      <nav className="flex-1 flex md:flex-col items-center md:items-stretch gap-1 md:gap-2 p-2 overflow-x-auto md:overflow-y-auto hide-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 p-2.5 rounded-card transition-colors shrink-0 md:shrink",
                isActive 
                  ? "bg-accent text-bg" 
                  : "text-text2 hover:text-text1 hover:bg-surface2"
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0 mx-auto md:mx-0" />
            <span className={cn("text-body-m font-medium truncate hidden md:block", isExpanded ? "opacity-100" : "opacity-0 w-0 hidden")}>
              {item.label}
            </span>
          </NavLink>
        ))}
        
        {/* Mobile Logout */}
        <button 
          onClick={() => signOut()}
          className="flex md:hidden items-center gap-3 p-2.5 rounded-card text-text3 hover:text-danger transition-colors shrink-0"
        >
          <LogOut className="w-5 h-5 shrink-0" />
        </button>
      </nav>

      <div className="hidden md:flex p-4 border-t border-border flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              <span className="text-bg text-mono font-bold uppercase">{userName.slice(0, 2)}</span>
            </div>
            <div className={cn("flex flex-col overflow-hidden transition-all", isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden")}>
              <span className="text-body-m text-text1 truncate">{userName}</span>
              <span className="text-label text-text3 truncate">Pro Plan</span>
            </div>
          </div>
          
          {isExpanded && (
            <button 
              onClick={() => signOut()}
              className="p-1.5 text-text3 hover:text-danger transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center p-2 rounded-btn bg-surface2 hover:bg-surface3 text-text2 transition-colors w-8 h-8 mx-auto"
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
