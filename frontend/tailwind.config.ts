import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0b0b0d', // Exact Linear dark background
          deep: '#020202',
        },
        'surface-default': '#111113', // Linear surface
        'surface-card': '#1a1a1e',
        'surface-accent': '#232326',
        'text-primary': '#f4f5f8', // Linear near-white text
        'text-secondary': '#a3a3a8',
        'text-muted': '#66666b',
        primary: {
          500: '#3b82f6', // Linear blue
          600: '#2563eb',
        },
        'risk-high': '#e11d48', // Refined Linear red
        'risk-medium': '#d97706', // Refined Linear amber
        'risk-low': '#059669', // Refined Linear emerald
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tightest: '-0.03em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'text-reveal': 'textReveal 1s cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        textReveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
