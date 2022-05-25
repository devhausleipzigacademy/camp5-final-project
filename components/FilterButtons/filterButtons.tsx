import React from "react";
import Button from "../Button/Button";

type FilterButtonsProps = {
  filterHandler: Function;
};

const FilterButtons = ({ filterHandler }: FilterButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button bgColor={"primary"} text={"Free"} clickFunction={filterHandler} />
      <Button bgColor={"primary"} text={"Swap"} clickFunction={filterHandler} />
    </div>
  );
};

export default FilterButtons;
