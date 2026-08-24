import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        paper: "#F5F6F5",
        card: "#FFFFFF",
        trust: {
          DEFAULT: "#1D5FA3",
          dark: "#154779",
          light: "#E8F0FA",
        },
        marigold: {
          DEFAULT: "#E8A33D",
          dark: "#C17F1F",
          light: "#FBEDD4",
        },
        go: {
          DEFAULT: "#1E8A5F",
          light: "#E3F5EC",
        },
        stop: {
          DEFAULT: "#C23B3B",
          light: "#FBEAEA",
        },
        line: "#E2E4E2",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        stamp: "6px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,33,61,0.06), 0 1px 12px rgba(20,33,61,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
