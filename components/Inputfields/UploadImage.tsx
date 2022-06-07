{
  /* Upload Multiple Files */
}

const UploadImage = () => {
  return (
    <div className="mt-6">
      <p>Upload Images and Videos here</p>
      <input
        className="px-3 py-2 block w-full text-sm text-gray-900 bg-BG rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-BG dark:border-gray-600 dark:placeholder-gray-400"
        id="multiple_files"
        type="file"
        multiple
      />
    </div>
  );
};

export default UploadImage;
