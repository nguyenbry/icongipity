import { z } from "zod";

export const Color = z.enum([
  "fuchsia",
  "blue",
  "green",
  "teal",
  "red",
  "orange",
  "yellow",
  "purple",
  "pink",
  "gray",
]);
export type Color = z.infer<typeof Color>;

export const PromptType = z.enum([
  "GLOWING_POLY",
  "VECTOR_DIGITAL",
  "EMOJI",
  "METALLIC",
  // "SMOOTH",
  // "MASCOT",
  // "TEST",
]);
export type PromptType = z.infer<typeof PromptType>;

export const PromptTypeToLabelMap: { [Label in PromptType]: string } = {
  GLOWING_POLY: "Polygonal",
  VECTOR_DIGITAL: "Digital Art",
  EMOJI: "Emoji",
  METALLIC: "Metallic",
  // SMOOTH: "Smooth",
  // TEST: "Test",
};

export const PromptGenMap: {
  [T in PromptType]: (noun: string, color: Color) => string;
} = {
  EMOJI: (noun, color) =>
    `Minimalistic emoji kawaii icon of a ${color} ${noun}, matte 3D render on dark background`,
  GLOWING_POLY: (noun, color) =>
    `icon of a glowing ${color} ${noun} low-poly polygonal isometric perspective, 8k, high resolution, artstation, dark background`,
  VECTOR_DIGITAL: (noun, color) =>
    `a ${color} ${noun} vector icon, against a dark background, digital art`,
  METALLIC: (noun, color) =>
    `icon of a ${noun} in metallic ${color} iridescent material, 3D render isometric perspective rendered in Cinema 4D on dark background`,
  // SMOOTH: (noun, color) =>
  //   `icon in smooth 3D render of a cute ${color} ${noun}, 4k, high resolution, trending in artstation`,
  // TEST: (noun, color) =>
  //   `icon in smooth 3D render of a cute ${color} ${noun}, 4k, high resolution, trending in artstation`,
};

export function cleanPrompt(raw: string) {
  const promptTokens = tokens(raw);
  const [first, ...rest] = promptTokens;

  const cleanedTokens = first === "a" || first === "an" ? rest : promptTokens;
  return cleanedTokens.join(" ");
}

function tokens(s: string) {
  return s
    .split(" ")
    .map((x) => x.trim().toLowerCase())
    .filter((x) => x.length > 0);
}
