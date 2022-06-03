import Header from "../components/Header/Header";
import { NextPage } from "next";
import Checkbox from "../components/Checkbox/Checkbox";
import CreateButton from "../components/Inputfields/CreateOfferButton";
import UploadImage from "../components/Header/UploadImage";
import InputTitle from "../components/Inputfields/TitleInput";
import PriceInputfield from "../components/Inputfields/PriceInput";
import DescriptionInputfield from "../components/Inputfields/DescriptionInput";
import { useState, useEffect } from "react";

type Field = {
  name: string;
  placeholder: string;
};

type SubCategory = {
  [key: string]: Field[];
};

type Category = {
  [key: keyof SubCategory]: SubCategory;
};

const categories: Category = {
  catOne: {
    subCatOne: [{ name: "type", placeholder: "Type" }],
    subCatTwo: [
      { name: "type", placeholder: "Type" },
      { name: "manual", placeholder: "Manual" },
    ],
  },
  catTwo: {
    subCatThree: [
      { name: "type", placeholder: "Type" },
      { name: "color", placeholder: "Color" },
    ],
    subCatFour: [
      { name: "type", placeholder: "Type" },
      { name: "condition", placeholder: "Condition" },
    ],
  },
};

const UploadPage: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [possibleSub, setPossibleSub] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  // useEffect(() => {
  //   console.log("");
  // }, [selectedCategory]);

  function handleOnChange() {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/share-inga-pp/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
  }

  useEffect(() => {
    if (selectedCategory) {
      setPossibleSub(Object.keys(categories[selectedCategory]));
    } else {
      setPossibleSub([]);
      setSelectedSub(() => "");
    }
    console.log(selectedCategory, selectedSub);
    if (selectedCategory && selectedSub) {
      console.log("fields", categories[selectedCategory][selectedSub]);
      setFields(() => categories[selectedCategory][selectedSub]);
    } else if (!selectedSub || !selectedCategory) {
      setFields([]);
    }
  }, [selectedCategory, selectedSub]);

  return (
    <div className="font-medium w-80 flex-col pt-16 min-h-full flex items-center justify-center py-1 px-1 mx-auto lg:px-8 w-full space-y-2">
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <InputTitle />
        <DescriptionInputfield />
        <Checkbox />
        <div className="mt-6">
          <p>Upload Images and Videos here</p>
          <input
            className="px-3 py-2 block w-full text-sm text-gray-900 bg-BG rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-BG dark:border-gray-600 dark:placeholder-gray-400"
            id="multiple_files"
            type="file"
            name="file"
            multiple
          />
        </div>
        <PriceInputfield />
        <select
          name="category"
          id="category"
          onChange={(evt) => {
            setSelectedSub("");
            setSelectedCategory(evt.target.value);
          }}
        >
          <option value={""} label="Empty"></option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat} label={cat}></option>
          ))}
        </select>

        {!!possibleSub.length && (
          <select
            name="category"
            id="category"
            onChange={(evt) => setSelectedSub(evt.target.value)}
          >
            <option value={""} label="Empty"></option>
            {possibleSub.map((cat) => (
              <option key={cat} value={cat} label={cat}></option>
            ))}
          </select>
        )}
        {!!fields.length &&
          fields.map((field) => (
            <input
              type="text"
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
            />
          ))}
        <CreateButton />
        {/* <CategoryInputs /> */}
      </form>
    </div>
  );
};

export default UploadPage;
