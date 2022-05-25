import clsx from "clsx";
import { on } from "events";
import { useState } from "react";

interface ButtonProps {
  bgColor: "primary" | "secondary" | "BG" | "error";
  text: string;
  width?: string | number;
  py?: number;
  clickFunction?: Function;
}

const Button = ({
  bgColor,
  text,
  width = "full",
  py = 0.5,
  clickFunction,
}: ButtonProps) => {
  return (
    <button
      //clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
      // https://github.com/lukeed/clsx/blob/master/readme.md
      className={clsx(
        `bg-${bgColor} text-${bgColor}-text py-${py} w-${width} px-8 rounded-md`
      )}
      onClick={() => clickFunction}
    >
      {text}
    </button>
  );
};

export default Button;
