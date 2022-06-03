import { useState } from "react";

interface Props {
  onChange: () => void;
  id: string;
  name: string;
}

const Checkbox = ({ onChange, id, name }: Props) => {
  return (
    // Giveaway Checkbox
    <div className="flex items-center gap-1 justify-center">
      <div className="ml-3  flex items-center h-5">
        <div>
          <input
            onChange={onChange}
            id={id}
            name={name}
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>

        {/*Giveaway lettering  */}
        <div className="min-w-0 flex-1 text-sm">
          <label htmlFor={name} className="text-gray-700 select-none">
            {name}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
