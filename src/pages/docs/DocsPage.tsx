import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function DocsPage() {
  return (
    <div className="min-h-screen bg-bg text-text1 flex flex-col">
      <header className="h-16 border-b border-border flex items-center px-6 sticky top-0 bg-bg/80 backdrop-blur-xl z-50">
        <Link to="/" className="flex items-center gap-2 text-text2 hover:text-text1 transition-colors text-body-m font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="text-display-m text-accent mx-auto absolute left-1/2 -translate-x-1/2">ASK.</span>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <aside className="w-64 border-r border-border hidden md:block py-10 px-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <h3 className="text-label text-text3 mb-4">Documentation</h3>
          <nav className="flex flex-col gap-3">
            <a href="#csv-formatting" className="text-body-m text-text2 hover:text-text1 transition-colors">CSV Formatting Guidelines</a>
            <a href="#scoring" className="text-body-m text-text2 hover:text-text1 transition-colors">How the AI Score Works</a>
            <a href="#privacy" className="text-body-m text-text2 hover:text-text1 transition-colors">Data Privacy & Security</a>
          </nav>
        </aside>

        <main className="flex-1 py-10 px-6 md:px-16 overflow-y-auto max-w-4xl">
          <h1 className="text-display-l mb-10">Documentation</h1>

          <section id="csv-formatting" className="mb-16">
            <h2 className="text-display-m mb-4">1. CSV Formatting Guidelines</h2>
            <p className="text-body-l text-text2 mb-6 leading-relaxed">
              To ensure the AI engine correctly processes your bank statements, please upload a CSV file with the following headers:
            </p>
            <div className="bg-surface2 border border-border rounded-card p-6 font-mono text-body-m overflow-x-auto mb-6">
              <span className="text-accent">Date</span>, <span className="text-accent">Description</span>, <span className="text-accent">Amount</span>, <span className="text-accent">Category</span><br />
              <span className="text-text3">2024-10-01, Netflix, 15.99, Subscriptions</span><br />
              <span className="text-text3">2024-10-03, Spotify, 9.99, Subscriptions</span>
            </div>
            <p className="text-body-m text-text3 italic">
              Note: The parser is somewhat flexible and will attempt to match common variations like "Transaction Date" or "Memo".
            </p>
          </section>

          <section id="scoring" className="mb-16">
            <h2 className="text-display-m mb-4">2. How the AI Score Works</h2>
            <p className="text-body-l text-text2 mb-6 leading-relaxed">
              The ASK. AI Score is a proprietary metric designed to reflect your overall financial health and purchasing behavior.
            </p>
            <ul className="list-disc list-inside space-y-4 text-body-l text-text2 mb-6">
              <li><strong>Savings Rate (60% weight):</strong> Calculated as (Income - Total Spend) / Income. A higher positive margin directly improves your score.</li>
              <li><strong>Spend Diversity (40% weight):</strong> Assesses the variance of your spending across different categories. Extremely concentrated spending (e.g., 90% in one category) lowers this metric.</li>
            </ul>
          </section>

          <section id="privacy" className="mb-16">
            <h2 className="text-display-m mb-4">3. Data Privacy & Security</h2>
            <p className="text-body-l text-text2 mb-6 leading-relaxed">
              At ASK., we believe your financial data belongs to you.
            </p>
            <div className="bg-surface border border-border border-l-4 border-l-accent p-6 rounded-r-card">
              <p className="text-body-l text-text1">
                All data uploaded via CSV is processed <strong className="text-accent">entirely locally</strong> within your browser. We do not transmit your transactions, balances, or queries to any external servers or third-party AI models.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
