import { type Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark-theme"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      colors: {
        xindigo: generateRadixColorScale("indigo"),
        xred: generateRadixColorScale("red"),
        xmint: generateRadixColorScale("mint"),
        xslate: generateRadixColorScale("slate"),
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

type RadixColorScale = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

function generateRadixColorScale(name: string) {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;
    return [id, `var(--${name}${id})`];
  });

  return Object.fromEntries(scale) as RadixColorScale;
}
