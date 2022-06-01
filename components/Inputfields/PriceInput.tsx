const PriceInput = () => {
  return (
    <div className="max-w-md w-full">
      <label htmlFor="Price" className="sr-only">
        Price
      </label>
      <input
        id="Price"
        name="Price"
        type="text"
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Price / Value"
      />
    </div>
  );
};

export default PriceInput;
