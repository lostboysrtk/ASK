import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/landing/LandingPage';
import { DocsPage } from './pages/docs/DocsPage';
import { AboutPage } from './pages/about/AboutPage';
import { AuthPage } from './pages/auth/AuthPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { Dashboard } from './pages/app/Dashboard';
import { Expenses } from './pages/app/Expenses';
import { CardsAdvisor } from './pages/app/CardsAdvisor';
import { AskAI } from './pages/app/AskAI';
import { Subscriptions } from './pages/app/Subscriptions';
import { Budgets } from './pages/app/Budgets';
import { Profile } from './pages/app/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected App Routes */}
        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="cards" element={<CardsAdvisor />} />
            <Route path="ask-ai" element={<AskAI />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
