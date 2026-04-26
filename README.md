# ASK. — AI-Powered Personal Finance Dashboard

![ASK. Banner](https://ojbzfynwckkqwxwuatag.supabase.co/storage/v1/object/public/assets/banner.png)

> **Financial freedom, the efficient way.**  
> ASK. is a premium, production-ready fintech dashboard designed for modern professionals and founders. It combines high-fidelity aesthetics with powerful AI-driven financial insights.

---

## ✨ Features

### 🔐 Secure Authentication
- **Supabase Integration**: Full user lifecycle management (Sign up, Login, Logout).
- **Protected Routes**: Secure dashboard access ensuring your financial data remains private.

### 🤖 AI Financial Engine
- **Ask AI**: Natural language interface to interrogate your financial data.
- **Smart Scoring**: Proprietary AI-calculated financial health score based on savings and spend diversity.
- **Anomaly Detection**: Automatic detection of unusual spending spikes.

### 💳 Spend & Card Management
- **Dashboard**: High-level overview of metrics, spend charts, and recent activity.
- **Cards Advisor**: Intelligent recommendations for top credit cards based on your actual spending habits.
- **Expense Tracking**: Visual breakdown of categories and transactional history.

### 📅 Planning & Subscriptions
- **Budget Planner**: Proactive category limits with real-time progress tracking.
- **Subscription Tracker**: Automatic detection of recurring payments (Netflix, Spotify, etc.).

### 💸 Payments & Billing
- **Razorpay Integration**: Seamless "Upgrade to Pro" flow integrated directly into the profile settings.
- **Demo Mode**: Built-in demonstration mode for testing payment flows without live credentials.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (Custom Design System)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Backend/Auth**: Supabase
- **Payments**: Razorpay
- **Charts**: Recharts
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lostboysrtk/ASK.git
   cd ASK
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (GlassCard, MetricTile, etc.)
├── data/           # Mock data and card databases
├── lib/            # Third-party initializations (Supabase, Razorpay)
├── pages/          
│   ├── app/        # Dashboard, Expenses, AI Chat, etc.
│   ├── auth/       # Login and Signup pages
│   └── landing/    # Marketing Landing Page
├── store/          # Zustand store for global state
├── utils/          # AI logic, Parsers, and Score calculators
└── types/          # TypeScript definitions
```

---

## 🛡️ Privacy & Security
ASK. is designed with a **Privacy-First** approach.
- Transactions uploaded via CSV are processed **locally** in your browser.
- Sensitive environment variables are managed via `.env` and are strictly ignored by Git to prevent leaks.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the ASK. Team
</p>
