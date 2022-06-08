import React, { SetStateAction } from "react";
import { Feature } from "./types";

export default function filterList(
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
