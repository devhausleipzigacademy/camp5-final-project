import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
    CheckIcon,
    SearchIcon,
    GiftIcon,
    SwitchVerticalIcon,
} from "@heroicons/react/solid";
import { Feature } from "../../utils/types";
import createPopUp from "../../utils/createPopUp";

import flyToStore from "../../utils/flyToStore";
import { useMapStore } from "../../stores/mapStore";
import { useLocationStore } from "../../stores/locationStore";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import Link from "next/link";
type SearchProps = {
    properties: Feature[];
};

export default function Search({ properties }: SearchProps) {
    const router = useRouter();
    const [selected, setSelected] = useState();
    const [query, setQuery] = useState("");
    const { mapRef } = useMapStore();
    const { location } = useLocationStore();

    const filteredItems =
        query === ""
            ? null
            : properties.filter((element) =>
                  element.properties.title
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );
    const filteredCategories =
        query === ""
            ? null
            : properties.filter((element) =>
                  element.properties.class
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );
    let mappedCategories;
    let mappedItems;
    let noItems;
    if (
        filteredItems?.length === 0 &&
        filteredCategories?.length === 0 &&
        query.length > 0
    ) {
        noItems = (
            <Combobox.Option
                value=""
                key=""
                className="flex space-x-3 relative cursor-default select-none bg-BG"
            >
                <span className="relative py-2 px-4 text-BG-text overflow-auto">
                    Nothing found.
                </span>
            </Combobox.Option>
        );
    }
    if (!!filteredItems?.length) {
        mappedItems = filteredItems.map((element, index) => (
            <Combobox.Option
                key={index}
                className={({ active }) =>
                    `flex space-x-3 relative cursor-default select-none ${
                        active ? "bg-BG text-primary" : "bg-BG"
                    }`
                }
                value={element.properties.title}
                onClick={() => {
                    createPopUp(element, location, mapRef, router);
                    setTimeout(() => flyToStore(element, mapRef), 300);
                }}
            >
                {({ selected, active }) => (
                    <>
                        {element.type === "FREE" ? (
                            <GiftIcon className="w-6 h-6 ml-1 flex justify-center" />
                        ) : (
                            <SwitchVerticalIcon className="w-6 h-6 ml-1 flex justify-center" />
                        )}
                        <span
                            className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                            }`}
                        >
                            {element.properties.title}
                        </span>
                        {selected ? (
                            <span
                                className={`absolute inset-y-0 left-0 flex items-start pl-3 ${
                                    active ? "text-white" : "text-BG-text"
                                }`}
                            ></span>
                        ) : null}
                    </>
                )}
            </Combobox.Option>
        ));
    }
    if (!!filteredCategories?.length) {
        mappedCategories = filteredCategories.map((element, index) => (
            <Combobox.Option
                key={index}
                className={({ active }) =>
                    `flex space-x-3 relative cursor-default select-none ${
                        active ? "bg-BG text-primary" : "bg-BG"
                    }`
                }
                value={element.properties.class}
                onClick={() => {
                    createPopUp(element, location, mapRef, router);
                    setTimeout(() => flyToStore(element, mapRef), 300);
                }}
            >
                {({ selected, active }) => (
                    <>
                        <span
                            className={`block truncate pl-2 ${
                                selected ? "font-medium" : "font-normal"
                            }`}
                        >
                            {`Category: ${element.properties.class}`}
                        </span>
                        {selected ? (
                            <span
                                className={`absolute inset-y-0 left-0 flex items-start pl-3 ${
                                    active ? "text-white" : "text-BG-text"
                                }`}
                            ></span>
                        ) : null}
                    </>
                )}
            </Combobox.Option>
        ));
    }
    return (
        <div className="flex px-2 mt-2">
            <div className="w-full h-full rounded-md border-primary border-2 text-center">
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative w-full cursor-default overflow-hidden bg-white text-left">
                        <Combobox.Input
                            className="pl-2 w-10/12 focus:outline-none border-none focus:border-none rounded-md py-2 text-sm text-BG-text"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-2 flex items-center opacity-100">
                            <SearchIcon
                                className="h-5 w-5 text-BG-text"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-0"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-[calc(100vw-16px)] overflow-auto rounded-md bg-white text-base shadow-lg sm:text-sm">
                            {noItems}
                            {mappedCategories}
                            {mappedItems}
                            {query && (
                                <Combobox.Option
                                    value="link to detailed search"
                                    className="opacity-100 bg-primary text-primary-text py-1"
                                >
                                    <Link href="/search">
                                        <div>Click for detailed search</div>
                                    </Link>
                                </Combobox.Option>
                            )}
                        </Combobox.Options>
                    </Transition>
                </Combobox>
            </div>
        </div>
    );
}
