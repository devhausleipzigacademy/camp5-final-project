import { Combobox, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { SellType } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { leafDetailsMap, leaves } from "../assets/class-models-paths";
import { ontology, details } from "../assets/metadata";
import Button from "../components/Button/Button";
import Checkbox from "../components/Checkbox/Checkbox";
import Input from "../components/Inputfields/Input";
import { useItemStore } from "../stores/itemStore";
import { getMapData } from "../utils/getMapData";

const Searchpage: NextPage = () => {
    const [title, setTitle] = useState("");
    const [checkedItems, setCheckedItems] = useState<SellType>("FREE");
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [possibleSub, setPossibleSub] = useState<string[]>([]);
    const [selectedSub, setSelectedSub] = useState("");
    const [possibleSubSub, setPossibleSubSub] = useState<string[]>([]);
    const [selectedSubSub, setSelectedSubSub] = useState<string>("undefined");
    const [fields, setFields] = useState<string[]>([]);
    const [selectedDetails, setSelectedDetails] = useState<
        Record<string, string>
    >({});
    const [selected, setSelected] = useState();
    const [query, setQuery] = useState("");
    const router = useRouter();
    const { items, setItems } = useItemStore();

    async function mapDataCheckAndFetch() {
        if (items.features.length === 0) {
            const initialMapData = await getMapData();
            setItems(initialMapData);
        }
    }
    mapDataCheckAndFetch();
    console.log("itemstate: ", items);

    const filteredItems = items.features.filter((item) =>
        item.properties.class.includes(selectedSubSub)
    );
    const filteredMapData = {
        type: "featureCollection",
        features: [...filteredItems],
    };
    console.log("filteredMapData: ", filteredMapData);
    // setItems(filteredMapData);

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
        //-----------------DEACTIVATED DETAILS FEATURE-------------------
        // if (selectedCategory && selectedSub && selectedSubSub) {
        //     console.log("fields", leafDetailsMap[selectedSubSub]);
        //     setFields(() => leafDetailsMap[selectedSubSub]);
        // } else {
        //     setFields(() => []);
        // }
    }, [selectedCategory, selectedSub, selectedSubSub]);

    useEffect(() => {
        setFields(() => []);
    }, [selectedCategory, selectedSub]);

    function searchHandler() {
        setItems(filteredMapData);
        console.log("searched items: ", items);
        router.push("/");
    }

    return (
        <div className="font-medium flex flex-col h-[calc(100vh-64px)] items-center overflow-scroll px-2">
            <div className="flex flex-col w-full px-2 space-y-2 pt-2 justify-between">
                {/* ---------------------- CHECKBOXES ------------------------- */}

                <div className="flex self-start w-full">
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

                <select
                    name="Category"
                    id="category"
                    className="rounded-md px-2 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-primary"
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
                        className="rounded-md px-2 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-primary"
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
                {!!possibleSubSub.length && (
                    <>
                        <p className="font-normal text-primary">Filters</p>
                        <select
                            className="rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-primary"
                            name="category"
                            id="category"
                            onChange={(evt) =>
                                setSelectedSubSub(evt.target.value)
                            }
                        >
                            <option
                                value={""}
                                label="Select Filters"
                                className="text-primary text-opacity-40"
                            ></option>
                            {possibleSubSub.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                    label={cat}
                                ></option>
                            ))}
                        </select>
                    </>
                )}
                {!!fields.length &&
                    fields.map((field) => (
                        <select
                            key={field}
                            className="rounded-md px-3 py-2 bg-primary bg-opacity-20 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-primary"
                            onChange={(evt) => {
                                let newDetails = { ...selectedDetails };
                                newDetails[field] = evt.target.value;
                                setSelectedDetails(newDetails);
                            }}
                        >
                            <option value="" label={`Select ${field}`}></option>
                            {/* @ts-ignore */}
                            {details[field].map((detail) => (
                                <option
                                    key={detail}
                                    value={detail}
                                    label={detail}
                                ></option>
                            ))}
                        </select>
                    ))}
            </div>
            <div className="flex flex-grow"></div>
            <div className="flex w-full pb-2">
                {selectedSubSub === "undefined" ? (
                    <button
                        // clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
                        // https://github.com/lukeed/clsx/blob/master/readme.md
                        className="px-8 rounded-md bg-primary text-primary-text py-2 w-full"
                        onClick={searchHandler}
                        type="submit"
                    >
                        filter
                    </button>
                ) : (
                    <button
                        // clsx generates strings from expressions to avoid bugs with string interpolation and tailwindcss
                        // https://github.com/lukeed/clsx/blob/master/readme.md
                        className="px-8 rounded-md bg-primary opacity-80 text-primary-text py-2 w-full"
                        onClick={searchHandler}
                        type="submit"
                        disabled
                    >
                        filter
                    </button>
                )}
            </div>
        </div>
    );
};

export default Searchpage;
