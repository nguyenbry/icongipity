import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "rgb(255, 231, 205)",
      },
    },
  },
  plugins: [],
} satisfies Config;
