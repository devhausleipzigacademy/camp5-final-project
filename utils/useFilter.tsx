import { useEffect, useState } from "react";
import { Feature, Filter } from "./types";

export default function useFilter(
  dataprop: Feature[],
  selectedFilter: string | undefined
) {
  const [data, setData] = useState<Feature[]>([]);
  const initialData = dataprop;
  const filterList = () => {
    if (!initialData) {
      return;
    } else if (selectedFilter === "Free") {
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
  };

  useEffect(() => {
    filterList();
  });
  return data;
}
