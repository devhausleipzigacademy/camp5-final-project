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
      <input
        onChange={checkHandler}
        id={id}
        name={name}
        checked={isChecked}
        type="checkbox"
        className="focus:ring-indigo-500 h-5 w-5 rounded-sm bg-primary"
      />
      {/* </div> */}
      <label htmlFor={name} className="text-primary select-none text-xs pr-2">
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
