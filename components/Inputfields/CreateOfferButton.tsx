const CreateOfferButton = () => {
  return (
    <div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute inset-0 flex items-center pl-3"></span>
        Create Offer
      </button>
    </div>
  );
};

export default CreateOfferButton;
