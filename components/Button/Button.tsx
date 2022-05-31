import clsx from "clsx";
import { on } from "events";
import { MouseEventHandler, useState } from "react";

interface ButtonProps {
  // bgColor: "primary" | "secondary" | "BG" | "error";
  bgColor: string;
  value: string;
  width?: string | number;
  py?: number;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  bgColor,
  value,
  width = "full",
  py = 0.5,
  onClick,
}: ButtonProps) => {
  return (
    <button
      // clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
      // https://github.com/lukeed/clsx/blob/master/readme.md
      className={clsx(
        `bg-${bgColor} py-${py} w-${width} px-8 rounded-md text-${bgColor}-text`
      )}
      onClick={onClick}
      value={value}
    >
      {value}
    </button>
  );
};

export default Button;
