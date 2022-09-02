import { useState } from "react";

interface Props {
  isChecked: boolean;
  id: string;
  name: string;
  checkHandler: () => void;
}

const Checkbox = ({ isChecked, id, name, checkHandler }: Props) => {
  return (
    // Giveaway Checkbox
    <div className="flex items-center justify-center space-x-1">
      {/* <div className="h-5 w-5 bg-primary opacity-20 rounded-sm"> */}
      <div className="relative">
        <input
          onChange={checkHandler}
          id={id}
          name={name}
          checked={isChecked}
          type="checkbox"
          className="absolute h-7 w-7 opacity-0 z-50"
        />
        {isChecked === true ? (
          <span className="absolute l-0 h-7 w-7 bg-secondary rounded-md"></span>
        ) : (
          <span className="absolute h-7 w-7 bg-primary bg-opacity-25 rounded-md"></span>
        )}
        {/* </div> */}
        <div className="mt-1">
          <label
            htmlFor={name}
            className="text-primary select-none text-regular font-normal pr-2 pl-9"
          >
            {name}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
