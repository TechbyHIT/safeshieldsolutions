import type { Config } from "tailwindcss";

/**
 * Safe Shield Solutions — logo palette.
 * 60/30/10: cool white / deep blue / orange CTA, with shield green highlights.
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
          50: "#E8F1FC",
          100: "#D0E3F8",
          200: "#A6C8F0",
          300: "#6FA6E3",
          400: "#3B82D6",
          500: "#1A66C4",
          600: "#0E54B0",
          700: "#0A4494",
          800: "#0A3678",
          900: "#0B2C5E",
          950: "#071A3A",
        },
        shield: {
          50: "#F1FBE8",
          100: "#DFF6C8",
          200: "#C2EC93",
          300: "#9DDC55",
          400: "#7EC82A",
          500: "#5BB425",
          600: "#45961C",
          700: "#367617",
          800: "#2C5C16",
          900: "#264C16",
          950: "#102A08",
        },
        accent: {
          50: "#FFF4E8",
          100: "#FFE4C7",
          200: "#FFC98A",
          300: "#FFA94D",
          400: "#FF8F24",
          500: "#F58220",
          600: "#E06A12",
          700: "#BC520E",
          800: "#933F10",
          900: "#783510",
          950: "#411A06",
        },
        neutral: {
          50: "#F7FAFC",
          100: "#EEF3F7",
          200: "#E2E8EE",
          300: "#CBD5DE",
          400: "#94A3B3",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        success: "#5BB425",
        warning: "#F58220",
        danger: "#C2410C",
        info: "#0E54B0",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(7,26,58,0.06), 0 8px 24px rgba(7,26,58,0.06)",
        cta: "0 8px 24px rgba(245,130,32,0.28)",
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
