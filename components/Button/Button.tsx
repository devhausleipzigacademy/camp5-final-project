import clsx from "clsx";
import { on } from "events";
import { MouseEventHandler, useState } from "react";
import {
  Identifier,
  IndexType,
  PropertyName,
  PropertyNameLiteral,
} from "typescript";

// interface ButtonProps {
//   bgColor: string;
//   value: string;
//   width?: string | number;
//   py?: string;
//   onClick: MouseEventHandler<HTMLButtonElement> | undefined;
//   text?: string;
// }

interface ButtonProps {
  category: "activefilter" | "notactivefilter";
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  value: string;
}

const Button = ({
  // bgColor,
  value,
  // width = "w-full",
  // py = "py-0.5",
  onClick,
  // text = `text-${bgColor}-text`,
  category,
}: ButtonProps) => {
  const styling = {
    activefilter: {
      bg: "bg-secondary",
      py: "py-0.5",
      width: "w-full",
      text: "text-secondary-text",
    },
    notactivefilter: {
      bg: "bg-primary",
      py: "py-0.5",
      width: "w-full",
      text: "text-primary-text",
    },
  };
  category = "activefilter";

  return (
    <button
      // clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
      // https://github.com/lukeed/clsx/blob/master/readme.md
      // doesn't work? hardcode the values and start again
      className={`${styling[category].bg} ${styling[category].py} ${styling[category].width} px-8 rounded-md ${styling[category].text}`}
      onClick={onClick}
      value={value}
    >
      {value}
    </button>
  );
};

export default Button;
