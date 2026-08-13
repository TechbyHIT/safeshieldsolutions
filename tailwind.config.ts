import type { Config } from "tailwindcss";

/**
 * Tailwind design system.
 * 60/30/10 colour principle:
 *  - 60% neutral surfaces (neutral.*)
 *  - 30% primary brand colour (brand.*)
 *  - 10% CTA accent colour (accent.*)
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8ec3ff",
          400: "#59a2ff",
          500: "#317dff",
          600: "#1a5ef5",
          700: "#1449e1",
          800: "#173cb6",
          900: "#19388f",
          950: "#142457",
        },
        accent: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc071",
          400: "#ff9a38",
          500: "#ff7d12",
          600: "#f06106",
          700: "#c74907",
          800: "#9e3a0e",
          900: "#7f320f",
          950: "#451605",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.06)",
        cta: "0 8px 24px rgba(240,97,6,0.25)",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
