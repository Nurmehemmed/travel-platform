import type { Config } from "tailwindcss";

/**
 * Shared Tailwind CSS preset for the travel-platform monorepo.
 * Design tokens match the addmetour design: deep forest-green primary,
 * warm gold accent, and a creamy off-white surface palette.
 */
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        // Brand primaries — deep forest / teal green family
        brand: {
          50:  "#edfaf5",
          100: "#d0f0e4",
          200: "#a4e0cb",
          300: "#6bc9af",
          400: "#3aae94",
          500: "#1d7a65",
          600: "#196456",
          700: "#164f44",
          800: "#133e35",  // primary CTA / navbar bg
          900: "#0f2e27",
          950: "#081a16",
        },
        // Accent — warm gold / amber for prices, highlights & CTAs
        accent: {
          50:  "#fefbf0",
          100: "#fef4d3",
          200: "#fde7a6",
          300: "#fcd46f",
          400: "#f9be3e",
          500: "#c9a227",  // primary gold accent
          600: "#b08a1a",
          700: "#8e6d12",
          800: "#6e540e",
          900: "#523f0b",
        },
        // Semantic surface colors
        surface: {
          DEFAULT: "#ffffff",
          cream:   "#f5ede0",
          muted:   "#faf6ef",
          subtle:  "#f1ebe0",
          dark:    "#133e35",
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
        glass:        "0 8px 32px 0 rgba(15, 23, 42, 0.12)",
        gold:         "0 4px 20px -2px rgba(201, 162, 39, 0.40)",
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
