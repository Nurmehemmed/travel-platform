import type { Config } from "tailwindcss";

/**
 * Shared Tailwind CSS preset for the travel-platform monorepo.
 * Design tokens: deep navy primary, sky-blue accent, amber gold highlights.
 * Updated from forest-green to sky/navy palette per brand refresh.
 */
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        // Brand primaries — deep navy / ocean blue family
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1e6fa5",  // mid-blue
          600: "#1a5f8e",
          700: "#164f78",
          800: "#0f3460",  // primary CTA / navbar bg
          900: "#061225",  // deep navy
          950: "#03090f",
        },
        // Accent — warm amber/gold for prices, highlights & CTAs
        accent: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",  // primary amber accent
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Sky-blue highlights
        sky: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",  // sky-blue accent
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Semantic surface colors
        surface: {
          DEFAULT: "#ffffff",
          sky:     "#f0f9ff",
          muted:   "#f8faff",
          subtle:  "#e8f4fd",
          dark:    "#0f3460",
        },
      },
      fontFamily: {
        sans:    ["var(--font-body)",    "Outfit",   "system-ui", "sans-serif"],
        body:    ["var(--font-body)",    "Outfit",   "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Fraunces", "Georgia",   "serif"],
        serif:   ["var(--font-display)", "Fraunces", "Georgia",   "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card:         "0 4px 24px -4px rgba(15, 23, 42, 0.10), 0 1px 4px -1px rgba(15, 23, 42, 0.05)",
        "card-hover": "0 16px 48px -8px rgba(15, 23, 42, 0.18), 0 2px 8px -2px rgba(15, 23, 42, 0.08)",
        glass:        "0 8px 32px 0 rgba(15, 52, 96, 0.12)",
        gold:         "0 4px 20px -2px rgba(245, 158, 11, 0.45)",
        sky:          "0 4px 20px -2px rgba(14, 165, 233, 0.40)",
        navy:         "0 8px 32px -4px rgba(15, 52, 96, 0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in":      "fade-in 0.5s ease-out both",
        "fade-in-left": "fade-in-left 0.5s ease-out both",
        shimmer:        "shimmer 1.4s ease-in-out infinite",
        "slide-up":     "slide-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
