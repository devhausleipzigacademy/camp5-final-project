import Header from "../components/Header/Header";
import { NextPage } from "next";
import Checkbox from "../components/Checkbox/Checkbox";
import CreateButton from "../components/Inputfields/CreateOfferButton";
import UploadImage from "../components/Header/UploadImage";
import InputTitle from "../components/Inputfields/TitleInput";
import PriceInputfield from "../components/Inputfields/PriceInput";
import DescriptionInputfield from "../components/Inputfields/DescriptionInput";

const UploadPage: NextPage = () => {
  return (
    <div className="font-medium w-80 flex-col pt-16 min-h-full flex items-center justify-center py-1 px-1 mx-auto lg:px-8 w-full space-y-2">
      <Header />
      <InputTitle />
      <DescriptionInputfield />
      <Checkbox />
      <UploadImage />
      <PriceInputfield />
      <CreateButton />
    </div>
  );
};

export default UploadPage;
