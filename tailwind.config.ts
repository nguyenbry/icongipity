import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tequila: {
          "50": "#fff6ed",
          "100": "#ffe7cd",
          "200": "#fed3aa",
          "300": "#fdb374",
          "400": "#fb883c",
          "500": "#f96716",
          "600": "#ea4d0c",
          "700": "#c2380c",
          "800": "#9a2d12",
          "900": "#7c2812",
          "950": "#431107",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
