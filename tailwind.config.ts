import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./site/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./site/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./site/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
