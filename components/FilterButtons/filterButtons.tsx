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
  toggle: string;
  // mapData: MapData | null;
  // setMapData: React.Dispatch<React.SetStateAction<MapData | null>>;
};

const FilterButtons = ({ clickHandler, toggle }: FilterButtonsProps) => {
  // const [activateFree, setActivateFree] = useState("secondary");
  // const [activateSwap, setActivateSwap] = useState("secondary");

  // function changeColor() {
  //   if (toggle === "Free") {
  //     setActivateSwap("primary");
  //   }
  //   if (toggle === "Swap") {
  //     setActivateFree("primary");
  //   }
  //   if (toggle === "") {
  //     setActivateFree("secondary");
  //     setActivateSwap("secondary");
  //   }
  //   console.log("not working");
  // }

  // changeColor();

  return (
    <div className="flex gap-2 px-2">
      <Button bgColor={activateFree} onClick={clickHandler} value={"Free"} />
      <Button bgColor={activateSwap} onClick={clickHandler} value={"Swap"} />
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
