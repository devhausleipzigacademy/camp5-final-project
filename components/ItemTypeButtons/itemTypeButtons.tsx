import React from "react";
const ItemTypeButtons = () => {
  return (
    <div className="flex gap-2 px-2">
      <div className="rounded-md w-1/2 bg-primary text-primary-text text-center py-0.5">
        Free
      </div>
      <div className="rounded-md w-1/2 bg-primary text-primary-text text-center py-0.5">
        Swap
      </div>
    </div>
  );
};

export default ItemTypeButtons;
