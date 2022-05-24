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
  //   const filterMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     if (!mapData) {
  //       console.log("no mapData");
  //       return;
  //     } else if ((event.target as HTMLButtonElement).value === "Free") {
  //       const filteredMarkersArr: Feature[] = mapData?.features.filter(
  //         (feature) => feature.type === "FREE"
  //       );
  //       const updatedMapData: MapData = {
  //         ...mapData,
  //         features: filteredMarkersArr,
  //       };
  //       console.log("did i get here?");
  //       setMapData(updatedMapData);
  //     } else {
  //       console.log("or did i get here?");
  //       const filteredMarkersArr: Feature[] = mapData?.features.filter(
  //         (feature) => feature.type === "SWAP"
  //       );
  //       const updatedMapData: MapData = {
  //         ...mapData,
  //         features: filteredMarkersArr,
  //       };
  //       setMapData(updatedMapData);
  //     }
  //   };

  return (
    <div className="flex gap-2">
      <Button bgColor={"primary"} onClick={clickHandler} value={"Free"} />
      <Button bgColor={"primary"} onClick={clickHandler} value={"Swap"} />
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
