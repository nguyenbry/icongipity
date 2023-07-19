import { IconLoader } from "@tabler/icons-react";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { environment } from "~/environment.mjs";
import { type RouterOutputs, api } from "~/utils/api";

export type Style = RouterOutputs["generate"]["styleOptions"][number]["type"];

export const StyleSelect: React.FC<{
  value: Style | undefined;
  onChange: (style: Style) => void;
}> = ({ onChange, value }) => {
  const optionsQuery = api.generate.styleOptions.useQuery();

  if (optionsQuery.isLoading)
    return <IconLoader className="mx-auto animate-spin" />;

  if (optionsQuery.isError) {
    console.error(optionsQuery.error);
    return <p>error</p>;
  }

  const { data } = optionsQuery;

  return (
    <>
      <div className="mt-5 flex flex-wrap justify-evenly gap-x-6 gap-y-8">
        {data.map(({ label, type, url }) => {
          const isSelected = type === value;

          return (
            <div
              className={classNames("flex flex-col items-center gap-4", {
                "scale-125": isSelected,
              })}
              key={label}
            >
              <div
                className={classNames(
                  "group relative aspect-square w-20 md:w-32"
                )}
                onClick={() => onChange(type)}
              >
                <Image
                  className={classNames(
                    "rounded-md ring-2 ring-offset-4 dark:ring-offset-neutral-900",
                    isSelected
                      ? "ring-tequila-100"
                      : "ring-black group-hover:ring-tequila-100 dark:ring-slate-700"
                  )}
                  src={environment.NEXT_PUBLIC_AWS_S3_BUCKET_URL + url}
                  // width={175}
                  // height={175}
                  fill
                  alt={`Icon style for ${label}`}
                />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col items-end text-sm text-gray-500">
        <span>Prompt: &apos;unicorn head &apos;</span>
        <span>Color: GREEN</span>
      </div>
    </>
  );
};
