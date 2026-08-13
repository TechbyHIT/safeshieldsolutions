import type { Config } from "tailwindcss";

/**
 * Tailwind design system — enterprise Glory palette.
 * 60/30/10: warm ivory / deep burgundy / champagne gold accent.
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
          50: "#FFF5F5",
          100: "#FDE8E8",
          200: "#F8CDCF",
          300: "#F0A8AC",
          400: "#E47A81",
          500: "#D0525C",
          600: "#B83D49",
          700: "#962F3B",
          800: "#762632",
          900: "#5A1F29",
          950: "#351219",
        },
        accent: {
          50: "#FFF9E8",
          100: "#FDF0C9",
          200: "#F8E2A0",
          300: "#EFCF70",
          400: "#E4BB4D",
          500: "#D2A537",
          600: "#B88925",
          700: "#956C1D",
          800: "#715119",
          900: "#4D3711",
          950: "#2D210A",
        },
        neutral: {
          50: "#FCFAF8",
          100: "#F5F1EE",
          200: "#EAE4E0",
          300: "#D8D0CB",
          400: "#A99D95",
          500: "#81746D",
          600: "#665A54",
          700: "#4D433F",
          800: "#352E2B",
          900: "#241F1D",
          950: "#151211",
        },
        success: "#4F805A",
        warning: "#D2A537",
        danger: "#B83D49",
        info: "#66747D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,31,29,0.06), 0 8px 24px rgba(36,31,29,0.06)",
        cta: "0 8px 24px rgba(90,31,41,0.16)",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
