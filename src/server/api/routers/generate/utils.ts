import { z } from "zod";

export const PromptType = z.enum(["GLOWING_POLY", "VECTOR_DIGITAL", "EMOJI"]);
export type PromptType = z.infer<typeof PromptType>;

export const PromptGenMap: {
  [T in PromptType]: (noun: string, color: string) => string;
} = {
  EMOJI: (noun, color) =>
    `Minimalistic emoji kawaii icon of a ${color} ${noun}, matte 3D render on dark background`,
  GLOWING_POLY: (noun, color) =>
    `icon of a glowing ${color} ${noun} low-poly polygonal isometric perspective, 8k, high resolution, artstation, dark background`,
  VECTOR_DIGITAL: (noun, color) =>
    `a ${color} ${noun} vector icon, against a dark background, digital art`,
};

export function cleanWhitespace(noun: string) {
  return noun
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .join(" ");
}
