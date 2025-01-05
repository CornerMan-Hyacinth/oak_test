import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "my-blue": "#0F81B0",
        "my-gray": "#333333",
        "my-yellow": "#A4B010",
        "my-light-yellow": "#D7DC96",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
