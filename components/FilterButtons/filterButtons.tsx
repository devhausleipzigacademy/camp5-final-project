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
  parentCallback: (buttonData: string[]) => void;
  // clickHandler: MouseEventHandler<HTMLButtonElement> | undefined;
  // free: boolean;
  // swap: boolean;
  // mapData: MapData | null;
  // setMapData: React.Dispatch<React.SetStateAction<MapData | null>>;
};

const FilterButtons = ({ parentCallback }: FilterButtonsProps) => {
  const [free, setFree] = useState(false);
  const [swap, setSwap] = useState(false);
  const [bgFree, setBgFree] = useState("secondary");
  const [bgSwap, setBgSwap] = useState("secondary");
  let [buttonData] = useState(["free", "swap"]);

  function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    if ((event.target as HTMLButtonElement).value === "Free") {
      if (free === true) {
        setFree(false);
        setBgFree("primary");
        buttonData = buttonData.filter((f) => f !== "free");
      }
      if (free === false) {
        setFree(true);
        setBgFree("secondary");
        buttonData.push("free");
      }
      // parentCallback(buttonData);
      console.log("inside free", buttonData);
    }
    if ((event.target as HTMLButtonElement).value === "Swap") {
      if (swap === true) {
        setSwap(false);
        setBgSwap("primary");
        buttonData = buttonData.filter((f) => f !== "swap");
      }
      if (swap === false) {
        setSwap(true);
        setBgSwap("secondary");
        buttonData.push("swap");
      }
      // parentCallback(buttonData);
      console.log("inside swap", buttonData);
    }
    console.log("inside function, outside if", buttonData);
    parentCallback(buttonData);
    return buttonData;
  }

  console.log("outside function:", buttonData);

  return (
    <div className="flex gap-2 px-2">
      <Button bgColor={bgFree} onClick={clickHandler} value={"Free"} />
      <Button bgColor={bgSwap} onClick={clickHandler} value={"Swap"} />
    </div>
  );
};

export default FilterButtons;
