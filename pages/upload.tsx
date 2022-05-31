import Header from "../components/Header/Header";
import { NextPage } from "next";
import Inputfield from "../components/Inputfield/Inputfield";
import Checkbox from "../components/Checkbox/Checkbox";
import CreateButton from "../components/Inputfield/CreateOfferButton";

const UploadPage: NextPage = () => {
  return (
    <div className="pt-16 space-y-2">
      <Header />
      <Inputfield />
      <Checkbox />
      <CreateButton />
    </div>
  );
};

export default UploadPage;
