import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-bg overflow-hidden flex-col md:flex-row pb-[60px] md:pb-0">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
