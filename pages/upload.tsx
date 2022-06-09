import { NextPage } from "next";
import Checkbox from "../components/Checkbox/Checkbox";
import UploadImage from "../components/Inputfields/UploadImage";
import { useState, useEffect, FormEvent, useMemo, ChangeEvent } from "react";
import { useFilePicker } from "use-file-picker";
import Button from "../components/Button/Button";
import Input from "../components/Inputfields/Input";
import { getCategories } from "../utils/getCategories";
import { Category, SellType } from "@prisma/client";
import { mockKitchenCategories } from "../assets/data";
import { Item, MockKitchenCategories } from "../utils/types";
import axios from "axios";

type SubCat = {
  title: string;
  description: string;
  subcategories: string[];
};
type Field = {
  name: string;
  placeholder: string;
};

// type SubCategory = {
//   [key: string]: Field[];
// };

// type Category = {
//   [key: keyof SubCategory]: SubCategory;
// };

// const categories: Category = {
//   catOne: {
//     subCatOne: [{ name: "type", placeholder: "Type" }],
//     subCatTwo: [
//       { name: "type", placeholder: "Type" },
//       { name: "manual", placeholder: "Manual" },
//     ],
//   },
//   catTwo: {
//     subCatThree: [
//       { name: "type", placeholder: "Type" },
//       { name: "color", placeholder: "Color" },
//     ],
//     subCatFour: [
//       { name: "type", placeholder: "Type" },
//       { name: "condition", placeholder: "Condition" },
//     ],
//   },
// };
type UploadProps = {
  title: string;
  images: Object;
  description: string;
  userId?: string;
  sellType: string;
  categoryTitle: string;
  subcategory: string;
};

const UploadPage: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const [possibleSub, setPossibleSub] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkedItems, setCheckedItems] = useState<SellType>("FREE");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  // const [price, setPrice] = useState("");

  function checkHandler() {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setCheckedItems("FREE");
    } else {
      setCheckedItems("SWAP");
    }
  }
  const kitchenCategories: MockKitchenCategories = mockKitchenCategories;
  // let subobjs: CatObject[] = kitchenCategories.kitchen
  // let subobj: CatObject = subobjs.filter(
  //   (cat) => cat.title === selectedCategory
  // );

  // let subs: string[] = subobj.subcategories;

  function clearInput() {
    setTitle("");
    setDescription("");
    // setPrice("");
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

  async function getData() {
    const categoryFetch = await getCategories();
    setCategory(categoryFetch);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    for (const subobj of kitchenCategories.kitchen) {
      subobj.title === selectedCategory
        ? setPossibleSub(subobj.subcategories)
        : null;
    }
  }, [selectedCategory]);
  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

    // UPLOAD IMAGE
    const formData = new FormData();

    for (const file of filesContent) {
      formData.append("file", file.content);
    }

    formData.append("upload_preset", "sharing-app-uploads");

    const imageData = await fetch(
      "https://api.cloudinary.com/v1_1/dadz3vdyw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    let imageFile: string = imageData.secure_url;
    console.log(imageFile);

    let images = { "0": imageFile };
    images = JSON.parse(JSON.stringify(images));

    const realData: UploadProps = {
      title,
      description,
      sellType: checkedItems,
      // price,
      userId: "15259b7b-cfec-4e57-ae0d-d5b6c1bb3a46",
      categoryTitle: selectedCategory,
      subcategory: selectedSub,
      images,
    };

    console.log(realData);
    await axios
      .post("/api/item", realData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // useEffect(() => {
  //   if (selectedCategory) {
  //     setPossibleSub(subs);
  //   } else {
  //     setPossibleSub([]);
  //     setSelectedSub(() => "");
  //   }
  //   console.log(selectedCategory, selectedSub);
  //   if (selectedCategory && selectedSub) {
  //     console.log("fields", categories[selectedCategory][selectedSub]);
  //     setFields(() => categories[selectedCategory][selectedSub]);
  //   } else if (!selectedSub || !selectedCategory) {
  //     setFields([]);
  //   }
  // }, [selectedCategory, selectedSub]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-medium pt-16 flex-col h-screen flex items-center justify-center pl-4 pr-10 w-full overflow-scroll">
      <form onSubmit={handleOnSubmit} className="w-full h-full space-y-2">
        {/* ---------------------- TITLE ------------------------- */}

        <Input
          name="Title"
          value={title}
          placeholder="Title"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
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
        <UploadImage
          errors={errors}
          filesContent={filesContent}
          openFileSelector={openFileSelector}
        />

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

        {/* <Input
          name="Price"
          value={price}
          placeholder="Price"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setPrice(event.target.value)
          }
        /> */}

        {/* ---------------------- CATEGORIES ------------------------- */}

        <div className="">
          <select
            className="w-1/2"
            name="category"
            id="category"
            onChange={(evt) => {
              setSelectedSub("");
              setSelectedCategory(evt.target.value);
            }}
          >
            <option value={""} label="Categories"></option>
            {category.map((cat) => (
              <option
                key={cat.identifier}
                value={cat.title}
                label={cat.title}
              ></option>
            ))}
          </select>
          {!!possibleSub.length && (
            <select
              className="w-1/2"
              name="category"
              id="category"
              onChange={(evt) => setSelectedSub(evt.target.value)}
            >
              <option value={""} label="Subcategories"></option>
              {possibleSub.map((cat) => (
                <option key={cat} value={cat} label={cat}></option>
              ))}
            </select>
          )}
        </div>
        {/* {!!fields.length &&
          fields.map((field) => (
            <input
              type="text"
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
            />
          ))} */}
        <Button type="submit" value="Create offer" selected={false} />
      </form>
    </div>
  );
};

export default UploadPage;
