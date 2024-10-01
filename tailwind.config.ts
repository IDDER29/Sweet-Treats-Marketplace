import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#F4A261", // Soft orange for accents
        input: "#F8F4F4", // Light cream for input backgrounds
        ring: "#F7C59F", // Warm beige for active elements
        background: "#FFF5E1", // Light pastel cream for overall background
        foreground: "#5E503F", // Deep brown for text and contrasts
        primary: {
          DEFAULT: "#E07A5F", // Soft coral for primary buttons and actions
          foreground: "#FFF4E3", // Creamy white for text on primary elements
        },
        secondary: {
          DEFAULT: "#81B29A", // Sage green for secondary elements
          foreground: "#FFF4E3", // Creamy white for text on secondary elements
        },
        destructive: {
          DEFAULT: "#F4A261", // Warm orange for warnings
          foreground: "#FFF4E3", // Creamy white for text on destructive elements
        },
        muted: {
          DEFAULT: "#F2CC8F", // Light yellow for muted elements
          foreground: "#5E503F", // Deep brown for muted text
        },
        accent: {
          DEFAULT: "#E9C46A", // Honey yellow for accent elements
          foreground: "#5E503F", // Deep brown for text on accent elements
        },
        popover: {
          DEFAULT: "#FFF4E3", // Creamy background for popovers
          foreground: "#5E503F", // Deep brown for popover text
        },
        card: {
          DEFAULT: "#FFF1DB", // Soft pastel peach for cards
          foreground: "#5E503F", // Deep brown for card text
        },
      },
      borderRadius: {
        lg: "16px", // Larger rounded corners for a softer feel
        md: "12px", // Medium rounded corners
        sm: "8px", // Smaller rounded corners for compact elements
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
