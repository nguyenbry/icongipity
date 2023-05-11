import { type TablerIconsProps } from "@tabler/icons-react";
import React, { useRef } from "react";

export type Tab = {
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
};

export const Tabs = <T extends readonly Tab[]>({
  value,
  tabs,
  onChange,
}: {
  tabs: T;
  value: T[number]["label"];
  onChange?: (value: T[number]["label"]) => void;
}) => {
  const hoverDiv = useRef<HTMLDivElement>(null);

  const isInBox = useRef(false);

  function setHoverStyle(translateX: number, width: number) {
    const div = hoverDiv.current;

    if (div) {
      div.style.transform = `translateX(${translateX}px)`;
      div.style.width = `${width}px`;

      div.style.transitionDuration = isInBox.current ? "150ms" : "0s";

      if (!isInBox.current) {
        isInBox.current = true;
      }

      return div;
    }
    throw new Error("div is null");
  }

  return (
    <div
      className="group relative flex rounded-lg"
      onMouseLeave={() => {
        isInBox.current = false;
      }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 z-[-1] h-full rounded-md opacity-20 group-hover:bg-slate-600 dark:group-hover:bg-slate-300"
        ref={hoverDiv}
      />
      {tabs.map(({ icon: Icon, label }) => {
        const isActive = value === label;

        return (
          <a
            onClick={onChange && (() => onChange(label))}
            className={
              "relative flex cursor-pointer items-center gap-1 rounded-md px-4 py-2 text-sm dark:hover:text-white" +
              (isActive
                ? " before:absolute before:bottom-[-8px] before:left-2 before:right-2 before:block before:border-b-[3px] before:border-b-black dark:text-white dark:before:border-b-white sm:before:left-3"
                : "")
            }
            key={label}
            onMouseEnter={(e) => {
              const tab = e.currentTarget;

              // if (label !== value) {
              setHoverStyle(tab.offsetLeft + 8, tab.offsetWidth - 16);
              // }
            }}
          >
            <Icon />
            <span className="hidden sm:inline">{label}</span>
          </a>
        );
      })}
    </div>
  );
};
