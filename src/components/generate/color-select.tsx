import { type RouterInputs } from "~/utils/api";

/**
 * Define valid colors on the api
 * Use TS to make sure the colors we allow on the frontend are synced
 */
export type Color = RouterInputs["generate"]["icon"]["color"];
const COLOR_MAP: { [C in Color]: string } = {
  fuchsia: "bg-fuchsia-500 ring-fuchsia-900 hover:ring-fuchsia-700",
  blue: "bg-blue-500 ring-blue-900 hover:ring-blue-700",
  green: "bg-green-500 ring-green-900 hover:ring-green-700",
  teal: "bg-teal-500 ring-teal-900 hover:ring-teal-700",
  red: "bg-red-500 ring-red-900 hover:ring-red-700",
  orange: "bg-orange-500 ring-orange-900 hover:ring-orange-700",
  yellow: "bg-yellow-500 ring-yellow-900 hover:ring-yellow-700",
  purple: "bg-purple-500 ring-purple-900 hover:ring-purple-700",
  pink: "bg-pink-500 ring-pink-900 hover:ring-pink-700",
  gray: "bg-gray-500 ring-gray-900 hover:ring-gray-700",
} as const;

const ColorSquare: React.FC<{
  color: keyof typeof COLOR_MAP;
  onClick?: () => void;
  isSelected: boolean;
}> = ({ color, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`col-span-1 aspect-square w-20 cursor-pointer rounded-md ring-1 ring-white ring-offset-4 ring-offset-neutral-900 md:w-32 ${
        COLOR_MAP[color]
      } ${isSelected ? "scale-125" : ""}`}
    />
  );
};

export const ColorSelect: React.FC<{
  value: Color | undefined;
  onChange?: (color: Color) => void;
}> = ({ value, onChange }) => {
  return (
    <>
      {Object.keys(COLOR_MAP).map((c) => {
        const color = c as Color;
        return (
          <ColorSquare
            key={color}
            color={color}
            onClick={onChange ? () => onChange(color) : undefined}
            isSelected={color === value}
          />
        );
      })}
    </>
  );
};
