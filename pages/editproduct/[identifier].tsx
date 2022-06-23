import { GetServerSideProps, NextPage } from "next";
import Checkbox from "../../components/Checkbox/Checkbox";
import UploadImage from "../../components/Inputfields/UploadImage";
import { useState, useEffect, FormEvent, useMemo, ChangeEvent } from "react";
import { useFilePicker } from "use-file-picker";
import Button from "../../components/Button/Button";
import Input from "../../components/Inputfields/Input";
import { PrismaClient, SellType } from "@prisma/client";
// import { mockKitchenCategories } from "../assets/data";
import { Feature, Item, MockKitchenCategories } from "../../utils/types";
import axios from "axios";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { ontology, details } from "../../assets/metadata";
import {
  leafDetailsMap,
  leafPathMap,
  leaves,
} from "../../assets/class-models-paths";
import { getItem } from "../../utils/getItem";
import UserItems from "../useritems";
import { getProduct } from "../../utils/getProduct";
import { useSession } from "next-auth/react";
import { setISOWeek } from "date-fns/esm";
import { getUser } from "../../utils/getUser";
import Image from "next/image";
import { itemList } from "../../utils/filterList";
import { details as details2 } from "../../assets/metadata";

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
  item: Item;
};

type Props = {
  // item: Item;
};

export default function EditProductPage({ item }: UploadProps): JSX.Element {
  const router = useRouter();
  const itemDetails = leafDetailsMap[item.class as string];
  const [itemCat, itemSubcat] = leafPathMap[item.class as string];
  const [productData, setProductData] = useState<Item | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(itemCat);
  const [category, setCategory] = useState<Node[]>([]);
  const [possibleSub, setPossibleSub] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState(itemSubcat);
  const [possibleSubSub, setPossibleSubSub] = useState<string[]>([]);
  const [selectedSubSub, setSelectedSubSub] = useState(item.class);
  const [fields, setFields] = useState<string[]>(itemDetails);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkedItems, setCheckedItems] = useState<SellType>("FREE");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [images, setImages] = useState<{ "0": string } | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<
    Record<string, string>
  >({});
  const [initialProductData, setInitialProductData] = useState<Feature[]>([]);
  console.log("item: ", item);
  // console.log("cat and subcat: ", itemCat, itemSubcat);

  // setSelectedCategory(itemCat);
  // setSelectedSub(itemSubcat);

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

  // useEffect(() => {
  //   console.log(item);
  // }, [item]);

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

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

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
    // console.log(selectedCategory, selectedSub);
    // console.log(selectedCategory && selectedSub && selectedSubSub);
    console.log("Details", Object(item.details)["Brand"]);
    if (selectedCategory && selectedSub && selectedSubSub) {
      console.log("fields", leafDetailsMap[selectedSubSub as string]);
      setFields(() => leafDetailsMap[item.class as string]);
      // console.log("fields", fields);
    } else {
      setFields(() => []);
    }
  }, [selectedCategory, selectedSub, selectedSubSub]);

  // useEffect(() => {
  //   setFields(() => []);
  // }, [selectedCategory, selectedSub]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!item) {
    return <> Hello</>;
  } else {
    return (
      <div className="font-medium flex flex-col space-y-2 px-2">
        {/* ---------------------- TITLE ------------------------- */}
        <div className="pt-2">
          <Input
            name="Title"
            value={item.title}
            placeholder="Title"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />
        </div>
        {/* ---------------------- DESCRIPTION ------------------------- */}
        <label htmlFor="Description" className="sr-only text-primary">
          Description
        </label>
        <textarea
          value={item.description}
          id="Description"
          name="Description"
          className="placeholder-primary placeholder-opacity-40 rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 h-24 sm:text-sm"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
        {/* ---------------------- UPLOAD ------------------------- */}
        <UploadImage
          errors={errors}
          filesContent={filesContent}
          openFileSelector={openFileSelector}
          clear={clear}
          images={[]} // images={...images}
        />
        <div className="h-auto w-full flex justify-center">
          <Image
            src={Object.values(item.images)[0]}
            height={200}
            width={200}
            layout="intrinsic"
            onClick={clear}
            alt=""
          />
        </div>
        {/* ---------------------- CHECKBOXES ------------------------- */}
        <div className="flex flex-row py-3 ">
          <Checkbox
            isChecked={item.sellType === "FREE" ? isChecked : !isChecked}
            name="Giveaway"
            id="giveaway"
            checkHandler={checkHandler}
          />
          <Checkbox
            isChecked={item.sellType === "SWAP" ? isChecked : !isChecked}
            name="Swap"
            id="swap"
            checkHandler={checkHandler}
          />
        </div>
        {/* ---------------------- CATEGORIES ------------------------- */}
        <div className="flex flex-col space-y-3">
          <select
            className="rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            name="category"
            id="category"
            onChange={(evt) => {
              setSelectedSub("");
              setSelectedCategory(evt.target.value);
            }}
          >
            <option value={itemCat} label={itemCat} />
            {Object.keys(ontology).map((cat) =>
              cat === itemCat ? null : <option value={cat}>{cat}</option>
            )}
          </select>
          {!!possibleSub.length && (
            <select
              className="rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="category"
              id="category"
              onChange={(evt) => setSelectedSub(evt.target.value)}
            >
              <option value={itemSubcat} label={itemSubcat}></option>
              {possibleSub.map((cat) =>
                cat === itemSubcat ? null : (
                  <option key={cat} value={cat} label={cat}></option>
                )
              )}
            </select>
          )}
          {!!possibleSubSub.length && (
            <select
              className="rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="category"
              id="category"
              onChange={(evt) => setSelectedSubSub(evt.target.value)}
            >
              <option value={item.class} label={item.class as string}></option>
              {possibleSubSub.map((cat) =>
                cat === item.class ? null : (
                  <option key={cat} value={cat} label={cat}></option>
                )
              )}
            </select>
          )}

          {!!fields.length &&
            fields.map((field) => (
              <select
                key={field}
                className="rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(evt) => {
                  let newDetails = { ...selectedDetails };
                  newDetails[field] = evt.target.value;
                  setSelectedDetails(newDetails);
                }}
              >
                <option
                  value={""}
                  label={
                    Object(item.details)[field] === undefined
                      ? `Select ${field}`
                      : Object(item.details)[field]
                  }
                ></option>
                {/* @ts-ignore */}
                {details[field].map((detail) => (
                  <option key={detail} value={detail} label={detail}></option>
                ))}
              </select>
            ))}
        </div>

        {/* ---------------------- SUBMIT ------------------------- */}
        <div className="flex pb-2">
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
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const prisma = new PrismaClient();
  const item = await prisma.item.findUnique({
    where: {
      identifier: query.identifier as string,
    },
    select: {
      identifier: true,
      title: true,
      images: true,
      description: true,
      details: true,
      // user: true,
      userId: true,
      sellType: true,
      parent: true,
      parentId: true,
      class: true,
      requests: true,
      gone: true,
      recipientId: true,
      recipient: true,
    },
  });

  return {
    props: {
      item,
    },
  };
};
