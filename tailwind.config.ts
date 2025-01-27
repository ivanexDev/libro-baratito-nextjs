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
        "orange-primary": "#FF8457",
        "blue-800": "#3F3D56",
        "blue-600": "#666479"
      },
    },
  },
  plugins: [],
} satisfies Config;
