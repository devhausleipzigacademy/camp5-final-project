import { GetServerSideProps, NextPage } from "next";
import Checkbox from "../../components/Checkbox/Checkbox";
import UploadImage from "../../components/Inputfields/UploadImage";
import { useState, useEffect, FormEvent, useMemo, ChangeEvent } from "react";
import { useFilePicker } from "use-file-picker";
import Button from "../../components/Button/Button";
import Input from "../../components/Inputfields/Input";
import { SellType } from "@prisma/client";
// import { mockKitchenCategories } from "../assets/data";
import { Item, MockKitchenCategories } from "../../utils/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ontology, details } from "../../assets/metadata";
import { leafDetailsMap, leaves } from "../../assets/class-models-paths";
import { getItem } from "../utils/getItem";
import item from "/api/item";
import UserItems from "../useritems";
import { getProduct } from "../../utils/getProduct";
import { useSession } from "next-auth/react";

type SubCat = {
  title: string;
  description: string;
  subcategories: string[];
};
type Field = {
  name: string;
  placeholder: string;
};

type UploadProps = {
  title: string;
  images: Object;
  description: string;
  userId?: string;
  sellType: string;
  categoryTitle: string;
  subcategory: string;
};

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const res = await fetch(`api/${context.params.id}`);
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
};

export default function EditProductPage(): JSX.Element {
  const router = useRouter();
  let id = router.asPath.split("identifier=")[1].split("&")[0];

  const [productData, setProductData] = useState<Item | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState<Node[]>([]);
  const [possibleSub, setPossibleSub] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [possibleSubSub, setPossibleSubSub] = useState<string[]>([]);
  const [selectedSubSub, setSelectedSubSub] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkedItems, setCheckedItems] = useState<SellType>("FREE");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [images, setImages] = useState<{ "0": string } | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<
    Record<string, string>
  >({});

  async function getProductData(id: string) {
    const item = await getProduct(id);
    setProductData(item);
    setTitle(item.title);
  }

  useEffect(() => {
    const storedValue = id;
    if (storedValue) {
      getProductData(storedValue);
    }
  }, []);

  function checkHandler() {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setCheckedItems("FREE");
    } else {
      setCheckedItems("SWAP");
    }
  }

  const session = useSession();

  const [openFileSelector, { filesContent, loading, errors, clear }] =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: true,
      limitFilesConfig: { min: 1, max: 5 },
      minFileSize: 0.001, // in megabytes
      maxFileSize: 50,
      imageSizeRestrictions: {
        maxHeight: 2000, // in pixels
        maxWidth: 2000,
        minHeight: 200,
        minWidth: 200,
      },
    });

  useEffect(() => {
    const handleFileUpload = async () => {
      const formData = new FormData();

      for (const file of filesContent) {
        formData.append("file", file.content);
      }
      formData.append("upload_preset", "sharing-app-uploads");

      let imageData: { secure_url: string } = { secure_url: "" };
      try {
        imageData = await fetch(
          "https://api.cloudinary.com/v1_1/dadz3vdyw/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
      } catch (err) {
        console.log(err);
      }

      setImages([imageData.secure_url]);
    };
    if (!!filesContent.length) {
      handleFileUpload();
    }
  }, [filesContent]);
  console.log(session.data);

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("submitted");

    const userId = session.data?.user.id;

    // UPLOAD IMAGE
    if (images) {
      const realData: UploadProps = {
        title,
        description,
        sellType: checkedItems,
        details: selectedDetails,
        class: selectedSubSub,
        images,
      };

      console.log(realData);
      try {
        await axios.post(
          `/api/item?path=Kitchen,${selectedSub}&user=${userId}`,
          realData
        );
        router.push("/useritems");
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    if (selectedCategory) {
      setPossibleSub(Object.keys(ontology[selectedCategory]));
    } else {
      setPossibleSub(() => []);
      setSelectedSub(() => "");
    }
    if (selectedSub && selectedCategory) {
      setPossibleSubSub(
        //@ts-ignore
        ontology[selectedCategory][selectedSub].map((cat) => cat[0])
      );
    } else {
      setSelectedSub(() => "");
      setPossibleSubSub(() => []);
      setSelectedSubSub(() => "");
    }
    console.log(selectedCategory, selectedSub);
    console.log(selectedCategory && selectedSub && selectedSubSub);
    if (selectedCategory && selectedSub && selectedSubSub) {
      console.log("fields", leafDetailsMap[selectedSubSub]);
      setFields(() => leafDetailsMap[selectedSubSub]);
    } else {
      setFields(() => []);
    }
  }, [selectedCategory, selectedSub, selectedSubSub]);

  useEffect(() => {
    setFields(() => []);
  }, [selectedCategory, selectedSub]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-medium pt-16 flex-col h-screen flex items-center justify-center pl-4 pr-10 w-full overflow-scroll">
      <div className="w-full h-full space-y-2">
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
          clear={clear}
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

        {/* ---------------------- CATEGORIES ------------------------- */}

        <div className="flex flex-col space-y-3">
          <select
            className="rounded-md w-full px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            name="category"
            id="category"
            onChange={(evt) => {
              setSelectedSub("");
              setSelectedCategory(evt.target.value);
            }}
          >
            <option value="" label="Select Category" />
            {Object.keys(ontology).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {!!possibleSub.length && (
            <select
              className="rounded-md w-full px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="category"
              id="category"
              onChange={(evt) => setSelectedSub(evt.target.value)}
            >
              <option value={""} label="Select Subcategory"></option>
              {possibleSub.map((cat) => (
                <option key={cat} value={cat} label={cat}></option>
              ))}
            </select>
          )}
          {!!possibleSubSub.length && (
            <select
              className="rounded-md w-full px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="category"
              id="category"
              onChange={(evt) => setSelectedSubSub(evt.target.value)}
            >
              <option value={""} label="Select SubSubcategory"></option>
              {possibleSubSub.map((cat) => (
                <option key={cat} value={cat} label={cat}></option>
              ))}
            </select>
          )}
          {!!fields.length &&
            fields.map((field) => (
              <select
                key={field}
                className="rounded-md w-full px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(evt) => {
                  let newDetails = { ...selectedDetails };
                  newDetails[field] = evt.target.value;
                  setSelectedDetails(newDetails);
                }}
              >
                <option value="" label={`Select ${field}`}></option>
                {/* @ts-ignore */}
                {details[field].map((detail) => (
                  <option key={detail} value={detail} label={detail}></option>
                ))}
              </select>
            ))}
        </div>
        <Button
          type="submit"
          onClick={handleOnSubmit}
          value="Create offer"
          selected={false}
        />
      </div>
    </div>
  );
}
