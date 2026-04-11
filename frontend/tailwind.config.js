/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808", // neutral-950
        foreground: "#FFFFFF", // neutral-50
        neutral: {
          950: "#080808",
          900: "#111111",
          800: "#1e1e1e",
          700: "#2e2e2e",
          400: "#a1a1aa",
          100: "#f4f4f5",
        },
        primary: {
          500: "#5e6ad2", // Linear accent blue
        },
        success: "#FFFFFF",
        warning: "#facc15",
        error: "#f87171",
        risk: {
          high: "#f87171",
          medium: "#facc15",
          low: "#FFFFFF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#FFFFFF", // Override grey with white
          muted: "#FFFFFF", // Also override muted with white for dashboard
        }
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        'base': ['15px', '24px'],
      },
      boxShadow: {
        'premium': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
