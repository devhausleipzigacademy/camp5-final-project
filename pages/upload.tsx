import Header from "../components/Header/Header";
import { NextPage } from "next";
import Checkbox from "../components/Checkbox/Checkbox";
import CreateButton from "../components/Inputfields/CreateOfferButton";
import UploadImage from "../components/Header/UploadImage";
import InputTitle from "../components/Inputfields/TitleInput";
import PriceInputfield from "../components/Inputfields/PriceInput";
import DescriptionInputfield from "../components/Inputfields/DescriptionInput";
import { useState, useEffect, FormEvent } from "react";
import { useFilePicker } from "use-file-picker";
import Button from "../components/Button/Button";
import { FileContent } from "use-file-picker/dist/interfaces";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [price, setPrice] = useState("");

  function toggleCheck(index: number) {
    setChecked((prev) => !prev);
    checkedItems[index];
  }

  function clearInput() {
    setTitle("");
    setDescription("");
    setPrice("");
    setPossibleSub([]);
    setSelectedSub(() => "");
    setFields([]);
  }
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 1 },
    minFileSize: 0.1, // in megabytes
    maxFileSize: 50,
    imageSizeRestrictions: {
      maxHeight: 900, // in pixels
      maxWidth: 1600,
      minHeight: 600,
      minWidth: 768,
    },
  });

  // useEffect(() => {
  //   console.log("");
  // }, [selectedCategory]);

  // function handleOnChange() {
  //   const reader = new FileReader();

  //   reader.onload = function (onLoadEvent) {
  //     setImageSrc(onLoadEvent.target.result);
  //     setUploadData(undefined);
  //   };
  //   reader.readAsDataURL(changeEvent.target.files[0]);
  // }

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    // UPLOAD IMAGE
    const formData = new FormData();

    for (const file of filesContent) {
      formData.append("file", file.content);
    }

    formData.append("upload_preset", "sharing-app-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dadz3vdyw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    let imageFile = data.secure_url;
    console.log(data);

    const realData = {
      title,
      description,
      checkedItems,
      price,
      selectedCategory,
      selectedSub,
      imageFile,
    };

    console.log(realData);
    clearInput();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-medium flex-col pt-32 min-h-full flex items-center justify-center py-1 px-1 mx-auto lg:px-8 w-full space-y-2">
      <form method="post" onSubmit={handleOnSubmit}>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          value={title}
          id="Title"
          name="Title"
          type="Text"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        {/* <InputTitle onChange={() => setTitle()} /> */}
        <label htmlFor="Description" className="sr-only">
          Description
        </label>
        <input
          value={description}
          id="Description"
          name="Description"
          type="text"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Checkbox
          onChange={() => toggleCheck(0)}
          name="Giveaway"
          id="giveaway"
        />
        <Checkbox onChange={() => toggleCheck(1)} name="Swap" id="swap" />
        <p>Upload Images and Videos here</p>
        <button
          className="text-primary-text group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => openFileSelector()}
        >
          Select files{" "}
        </button>
        {errors.length ? (
          errors.map((error, index) => (
            <div key={index} className="flex bg-error text-error-text">
              <p>{error.name}</p>
              <p>INVALID PIC</p>
              <br />
            </div>
          ))
        ) : (
          <div>
            {filesContent.map((file, index) => (
              <div key={index}>
                <h2>{file.name}</h2>
                <img alt={file.name} src={file.content}></img>
                <br />
              </div>
            ))}
          </div>
        )}
        <label htmlFor="Price" className="sr-only">
          Price
        </label>
        <input
          onChange={(event) => setPrice(event.target.value)}
          id="Price"
          name="Price"
          type="text"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Price / Value"
        />
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
        <button
          type="submit"
          className="text-primary-text group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute inset-0 flex items-center pl-3"></span>
          Create Offer
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
