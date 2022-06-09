import clsx from "clsx";
import { MouseEventHandler } from "react";

interface ButtonProps {
  selected: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  value: string;
  type: "button" | "submit";
}

const Button = ({ value, onClick, selected, type }: ButtonProps) => {
  return (
    <button
      // clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
      // https://github.com/lukeed/clsx/blob/master/readme.md
      className={clsx(
        "px-8 rounded-md",
        type === "submit"
          ? "bg-primary text-primary-text py-2 w-11/12"
          : selected
          ? "bg-secondary text-secondary-text py-0.5 w-full"
          : "bg-primary text-primary-text py-0.5 w-full"
      )}
      onClick={onClick}
      value={value}
      type={type}
    >
      {value}
    </button>
  );
};

export default Button;
