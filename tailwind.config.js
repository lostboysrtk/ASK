/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#101010',
        surface2: '#161616',
        surface3: '#1c1c1c',
        border: 'rgba(255,255,255,0.06)',
        border2: 'rgba(255,255,255,0.11)',
        border3: 'rgba(255,255,255,0.18)',
        accent: '#c8f135',
        accent2: '#a8d120',
        text1: '#f2f2f2',
        text2: '#888888',
        text3: '#555555',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        pill: '999px',
        btn: '28px',
        card: '16px',
        input: '10px',
        badge: '8px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
