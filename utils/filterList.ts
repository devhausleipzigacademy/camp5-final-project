import React, { SetStateAction } from "react";
import { Feature, Item } from "./types";

export function filterList(
  selectedFilter: string,
  initialData: Feature[],
  setData: React.Dispatch<React.SetStateAction<Feature[]>>
) {
  if (selectedFilter === "Free") {
    const filteredArray: Feature[] = initialData?.filter(
      (feature) => feature.type === "FREE"
    );
    setData(() => filteredArray);
  } else if (selectedFilter === "Swap") {
    const filteredArray: Feature[] = initialData?.filter(
      (feature) => feature.type === "SWAP"
    );
    setData(() => filteredArray);
  } else {
    setData(initialData);
  }
}

export function itemList(
  selectedFilter: string,
  initialData: Item[],
  setData: React.Dispatch<React.SetStateAction<Item[]>>
) {
  if (selectedFilter === "Free") {
    const filteredArray: Item[] = initialData?.filter(
      (item) => item.sellType === "free"
    );
    setData(() => filteredArray);
  } else if (selectedFilter === "Swap") {
    const filteredArray: Item[] = initialData?.filter(
      (item) => item.sellType === "swap"
    );
    setData(() => filteredArray);
  } else {
    setData(initialData);
  }
}
