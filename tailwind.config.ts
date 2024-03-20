import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gray: { 
            light: "#D2D5DB",
            DEFAULT: "#E6E7EB",
          },
          purple: {
            dark: "#7A3FE6",
            mid: "#DDD6FC",
            light: "#EDE9FD",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
