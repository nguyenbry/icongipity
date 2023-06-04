import { type VariantProps, cva } from "class-variance-authority";
import classNames from "classnames";
import { type RouterInputs } from "~/utils/api";

/**
 * Define valid colors on the api
 * Use TS to make sure the colors we allow on the frontend are synced
 */
export type Color = RouterInputs["generate"]["icon"]["color"];

const COLOR_MAP: { [C in Color]: string } = {
  fuchsia:
    "bg-fuchsia-500 data-[selected=true]:ring-fuchsia-700 hover:ring-fuchsia-700",
  blue: "bg-blue-500 data-[selected=true]:ring-blue-700 hover:ring-blue-700",
  green:
    "bg-green-500 data-[selected=true]:ring-green-700 hover:ring-green-700",
  teal: "bg-teal-500 data-[selected=true]:ring-teal-700 hover:ring-teal-700",
  red: "bg-red-500 data-[selected=true]:ring-red-700 hover:ring-red-700",
  orange:
    "bg-orange-500 data-[selected=true]:ring-orange-700 hover:ring-orange-700",
  yellow:
    "bg-yellow-500 data-[selected=true]:ring-yellow-700 hover:ring-yellow-700",
  purple:
    "bg-purple-500 data-[selected=true]:ring-purple-700 hover:ring-purple-700",
  pink: "bg-pink-500 data-[selected=true]:ring-pink-700 hover:ring-pink-700",
  gray: "bg-gray-500 data-[selected=true]:ring-gray-700 hover:ring-gray-700",
} as const;

const colorSquareVariants = cva(
  "col-span-1 aspect-square w-20 cursor-pointer rounded-md ring-1 ring-offset-4 ring-offset-xindigo-2 ring-xindigo-6 md:w-32 transition hover:ring-2",
  {
    variants: {
      color: COLOR_MAP,
    },
  }
);

const ColorSquare: React.FC<
  VariantProps<typeof colorSquareVariants> & {
    onClick?: () => void;
    isSelected: boolean;
  }
> = ({ color, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      data-selected={isSelected}
      className={classNames(
        { "scale-125 ring-2": isSelected },
        colorSquareVariants({ color })
      )}
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
