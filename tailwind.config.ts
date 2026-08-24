import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        paper: "#F4F7FB",
        card: "#FFFFFF",
        trust: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          light: "#EAF1FF",
        },
        marigold: {
          DEFAULT: "#F59E0B",
          dark: "#B45309",
          light: "#FFF4D6",
        },
        go: {
          DEFAULT: "#17805B",
          light: "#E7F7EF",
        },
        stop: {
          DEFAULT: "#C23B3B",
          light: "#FBEAEA",
        },
        line: "#DCE4F0",
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        body: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"],
      },
      borderRadius: {
        stamp: "14px",
      },
      boxShadow: {
        card: "0 2px 4px rgba(20,33,61,0.03), 0 14px 38px rgba(20,33,61,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
