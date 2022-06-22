import { SellType } from "@prisma/client";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { leafDetailsMap } from "../assets/class-models-paths";
import { ontology } from "../assets/metadata";
import Button from "../components/Button/Button";
import Checkbox from "../components/Checkbox/Checkbox";
import Input from "../components/Inputfields/Input";
import { getCategories } from "../utils/getCategories";

const Searchpage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [checkedItems, setCheckedItems] = useState<SellType>("FREE");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [possibleSub, setPossibleSub] = useState<string[]>([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [possibleSubSub, setPossibleSubSub] = useState<string[]>([]);
  const [selectedSubSub, setSelectedSubSub] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<
    Record<string, string>
  >({});

  function checkHandler() {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setCheckedItems("FREE");
    } else {
      setCheckedItems("SWAP");
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

  function submitHandler() {}
  return (
    <div className="font-medium pt-16 flex-col h-screen flex items-center justify-center pl-4 pr-10 w-full overflow-scroll">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="space-y-2">
          <Input
            name="Title"
            value="title"
            placeholder="Title"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          ></Input>

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
              name="Category"
              id="category"
              className="rounded-md w-full px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            {/* ----------------- FILTERS ----------------- */}
            <p className="font-normal">Filters</p>
            {/* {!!possibleSubSub.length && (
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
        )} */}
          </div>
        </div>
        <Button
          type="submit"
          onClick={submitHandler}
          value="Search"
          selected={false}
        />
      </div>
    </div>
  );
};

export default Searchpage;
