const Checkbox = () => {
  return (
    // Giveaway Checkbox
    <div className="flex items-center gap-1 justify-center">
      <div className="ml-3  flex items-center h-5">
        <div>
          <input
            id="Giveaway"
            name="Giveaway"
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>

        {/*Giveaway lettering  */}
        <div className="min-w-0 flex-1 text-sm">
          <label htmlFor="Giveaway" className="text-gray-700 select-none">
            Giveaway
          </label>
        </div>
      </div>

      {/* // Swap Checkbox */}
      <div className="ml-3 flex items-center h-5">
        <input
          id="Swap"
          name="Swap"
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />

        {/*Swap lettering  */}
        <div className="min-w-0 flex-1 text-sm">
          <label htmlFor="Swap" className="text-gray-700 select-none">
            Swap
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
