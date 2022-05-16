import clsx from "clsx";

interface ButtonProps {
  bgColor: "primary" | "secondary" | "BG" | "error";
  text: string;
  width?: string;
}

const Button = ({ bgColor, text, width = "full" }: ButtonProps) => {
  return (
    <button
      // we tried to write like below, but it caused an error with next-js style rendering
      //   className={`bg-${bgColor} text-${bgColor}-text px-2 py-1 rounded-md`}
      //   so we used a package clsx which generates strings from tournaries
      // see more: https://github.com/lukeed/clsx/blob/master/readme.md
      className={clsx(
        bgColor === "primary"
          ? "bg-primary text-primary-text"
          : bgColor === "secondary"
          ? "bg-secondary text-secondary-text"
          : bgColor === "error"
          ? "bg-error text-error-text"
          : bgColor === "BG"
          ? "bg-BG text-BG-text"
          : "primary",
        `px-8 py-0.5 rounded-md w-${width}`
      )}
    >
      {text}
    </button>
  );
};

export default Button;
