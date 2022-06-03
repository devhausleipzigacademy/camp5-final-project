const TitleInput = () => {
  return (
    <div className="max-w-md w-full">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px mt-10">
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="Title"
            name="Title"
            type="Text"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Title"
          />
        </div>
      </div>
    </div>
  );
};

export default TitleInput;
