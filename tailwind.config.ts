import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B2E2B",
        paper: "#F7F7F0",
        card: "#FFFFFF",
        trust: {
          DEFAULT: "#007A68",
          dark: "#005F52",
          light: "#E3F4EF",
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
        line: "#DDE5E1",
      },
      fontFamily: {
        display: ["Avenir Next", "Avenir", "Segoe UI", "sans-serif"],
        body: ["Inter", "Avenir Next", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      borderRadius: {
        stamp: "18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,46,43,0.04), 0 14px 32px rgba(11,46,43,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
