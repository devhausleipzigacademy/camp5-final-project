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
import { PlusCircleIcon } from "@heroicons/react/solid";

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
  const [checkedItems, setCheckedItems] = useState("FREE");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [price, setPrice] = useState("");

  function checkHandler() {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setCheckedItems("FREE");
    } else {
      setCheckedItems("SWAP");
    }
  }

  function clearInput() {
    setTitle("");
    setDescription("");
    setPrice("");
    setPossibleSub([]);
    setSelectedSub(() => "");
    setFields([]);
    setIsChecked(true);
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
    <div className="font-medium pt-16 flex-col h-screen flex items-center justify-center pl-4 pr-10 w-full overflow-scroll">
      <form
        method="post"
        onSubmit={handleOnSubmit}
        className="w-full h-full space-y-2"
      >
        {/* ---------------------- TITLE ------------------------- */}

        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          value={title}
          id="Title"
          name="Title"
          type="Text"
          className="placeholder-primary placeholder-opacity-40 rounded-md w-full px-3 py-3 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        {/* ---------------------- DESCRIPTION ------------------------- */}

        <label htmlFor="Description" className="sr-only text-primary">
          Description
        </label>
        <textarea
          value={description}
          id="Description"
          name="Description"
          className="placeholder-primary placeholder-opacity-40 rounded-md w-full px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 h-24 sm:text-sm"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
        {/* ---------------------- UPLOAD ------------------------- */}
        <div className="w-full">
          {errors.length ? (
            errors.map((error, index) => (
              <div className="w-full rounded-md bg-primary bg-opacity-20 text-primary text-opacity-40 px-3 py-2 flex flex-row flex-grow justify-between items-center sm:text-sm">
                <div key={index} className="flex bg-error text-error-text">
                  <p>{error.name}</p>
                  <p>INVALID PIC</p>
                  <br />
                </div>
                <button onClick={() => openFileSelector()}>
                  <PlusCircleIcon className="text-primary h-8" />
                </button>
              </div>
            ))
          ) : filesContent.length ? (
            <div>
              {filesContent.map((file, index) => (
                <div key={index}>
                  <div className="w-full rounded-md bg-primary bg-opacity-20 text-primary text-opacity-40 px-3 py-2 flex flex-row justify-between items-center sm:text-sm">
                    <p className="font-normal">{file.name}</p>
                    <button onClick={() => openFileSelector()}>
                      <PlusCircleIcon className="text-primary h-8" />
                    </button>
                  </div>
                  <img alt={file.name} src={file.content}></img>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full rounded-md bg-primary bg-opacity-20 text-primary text-opacity-40 px-3 py-2 flex flex-row justify-between items-center sm:text-sm">
              <p className="font-normal">Photo </p>
              <button onClick={() => openFileSelector()}>
                <PlusCircleIcon className="text-primary h-8" />
              </button>
            </div>
          )}
        </div>
        {/* ---------------------- CHECKBOXES ------------------------- */}

        <div className="flex flex-row py-3 ">
          <Checkbox
            isChecked={isChecked}
            name="Giveaway"
            id="giveaway"
            checkHandler={checkHandler}
          />
          <Checkbox
            isChecked={!isChecked}
            name="Swap"
            id="swap"
            checkHandler={checkHandler}
          />
        </div>
        {/* ---------------------- VALUE ------------------------- */}

        <label htmlFor="Price" className="sr-only">
          Price
        </label>
        <input
          onChange={(event) => setPrice(event.target.value)}
          id="Price"
          name="Price"
          type="text"
          className="placeholder-primary placeholder-opacity-40 rounded-md w-full px-3 py-3 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Price / Value"
          value={price}
        />
        {/* ---------------------- CATEGORIES ------------------------- */}

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
        <Button type="submit" value="Create Offer" selected={false} />
      </form>
    </div>
  );
};

export default UploadPage;
