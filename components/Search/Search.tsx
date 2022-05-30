import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SearchIcon } from "@heroicons/react/solid";
import { Feature } from "../../utils/types";

type SearchProps = {
  properties: Feature[];
};

export default function Search({ properties }: SearchProps) {
  const [selected, setSelected] = useState();
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? null
      : properties.filter((element) =>
          element.properties.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  console.log(properties);
  return (
    <div className="flex px-2 mt-2">
      <div className="w-full h-full rounded-md border-primary border-2 text-center">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative w-full cursor-default overflow-hidden bg-white text-left">
            <Combobox.Input
              className="w-full focus:outline-none border-none focus:border-none rounded-md py-2 text-sm text-BG-text"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SearchIcon className="h-5 w-5 text-BG-text" aria-hidden="true" />
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
              {!filteredItems && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-BG-text">
                  Nothing found.
                </div>
              ) : (
                !!filteredItems?.length &&
                filteredItems.map((element, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none bg-BG pl-10 pr-4 ${
                        active ? "bg-primary-text text-primary" : "bg-BG"
                      }`
                    }
                    value={element.properties.title}
                  >
                    {({ selected, active }) => (
                      <>
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
                ))
              )}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </div>
  );
}
