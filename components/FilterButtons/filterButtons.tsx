import React, {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { getFreeItems } from "../../utils/getFreeItems";
import { getMapData } from "../../utils/getMapData";
import { getSwapItems } from "../../utils/getSwapItems";
import { Feature, MapData } from "../../utils/types";
import Button from "../Button/Button";

type FilterButtonsProps = {
  clickHandler: MouseEventHandler<HTMLButtonElement> | undefined;
  // mapData: MapData | null;
  // setMapData: React.Dispatch<React.SetStateAction<MapData | null>>;
};

const FilterButtons = ({ clickHandler }: FilterButtonsProps) => {
  return (
    <div className="flex gap-2 px-2 text-primary-text">
      <Button onClick={clickHandler} type="button" value={"Free"} />
      <Button type="button" value={"Swap"} onClick={clickHandler} />
    </div>
  );
};

export default FilterButtons;

// async function getAllMapData() {
//   const mapDataFetch = await getMapData();
//   setMapData(mapDataFetch);
// }

// async function getFreeData() {
//   const freeItems = await getFreeItems();
//   setMapData(freeItems);
// }

// async function getSwapData() {
//   const swapItems = await getSwapItems();
//   setMapData(swapItems);
// }

// const filterMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
//   if ((event.target as HTMLButtonElement).value === "Free") {
//     getFreeData();
//     console.log("free baby");
//   } else if ((event.target as HTMLButtonElement).value === "Swap") {
//     getSwapData();
//   } else {
//     getAllMapData();
//   }
