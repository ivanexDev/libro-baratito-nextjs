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
        "orange-500": "#FF8457",
        "gray-800": "#3F3D56",
        "gray-600": "#666479",
        "gray-300": "#D0D0D0"
      },
    },
  },
  plugins: [],
} satisfies Config;
