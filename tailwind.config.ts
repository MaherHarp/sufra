import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6EFE2",
        linen: "#EFE4CF",
        olive: { DEFAULT: "#5B6B2F", deep: "#3B4620", soft: "#E3E6CF" },
        terra: { DEFAULT: "#B5532E", soft: "#F3DACB" },
        walnut: { DEFAULT: "#4A3222", soft: "#7A5C45" },
        wood: "#C89B6D",
        saffron: { DEFAULT: "#D9A13B", soft: "#F7E6C1" },
      },
      fontFamily: {
        display: ['"Young Serif"', "Georgia", "serif"],
        sans: ['"Figtree Variable"', "system-ui", "sans-serif"],
        arabic: ['"Amiri"', "serif"],
      },
      maxWidth: { prose: "68ch" },
      borderRadius: { arch: "999px 999px 1.25rem 1.25rem" },
    },
  },
  plugins: [],
};
export default config;
