const DescriptionInput = () => {
  return (
    <div className="max-w-md w-full">
      <form action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="Description" className="sr-only">
              Description
            </label>
            <input
              id="Description"
              name="Description"
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DescriptionInput;
