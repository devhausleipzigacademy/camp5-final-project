const Checkbox = () => {
  return (
    <div className="flex items-center gap-1 justify-center">
      <div className="mt-4" />
      <div className="relative flex items-center py-4">
        <div className="ml-3 flex items-center h-5">
          <input
            id="free"
            name="free"
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>

        <div className="min-w-0 flex-1 text-sm">
          <label
            htmlFor="free"
            className="font-medium text-gray-700 select-none"
          >
            Free
          </label>
        </div>
      </div>

      <div className="ml-3 flex items-center h-5">
        <input
          id="Swap"
          name="Swap"
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>

      <div className="relative flex items-start py-4">
        <div className="min-w-0 flex-1 text-sm">
          <label
            htmlFor="Swap"
            className="font-medium text-gray-700 select-none"
          >
            Swap
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
