export const COLORS = {
  blue: "bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white",
  cyan: "bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white",
  red: "bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white",
  transparent:
    "bg-transparent dark:hover:bg-neutral-800 hover:bg-gray-200 text-black dark:text-white !shadow-none",
};

export type Color = keyof typeof COLORS;
