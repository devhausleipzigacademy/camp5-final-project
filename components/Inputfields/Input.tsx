import { ChangeEvent, SetStateAction } from "react";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, value, placeholder, onChange }: Props) => {
  return (
    <div className="flex w-full">
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <input
        value={value}
        id={name}
        name={name}
        type="Text"
        className="placeholder-primary placeholder-opacity-40 rounded-md py-3 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-2 w-full"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
