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
  let [buttonData] = useState<string[]>([]);

  // let buttonData = ["free", "swap"];

  let bgFree = "secondary";
  let bgSwap = "secondary";

  function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    if ((event.target as HTMLButtonElement).value === "Free") {
      if (free === true) {
        setFree(false);
        bgFree = "primary";
        buttonData = buttonData.filter((f) => f !== "free");
      }
      if (free === false) {
        setFree(true);
        bgFree = "secondary";
        buttonData.push("free");
      }
      parentCallback(buttonData);
    }
    if ((event.target as HTMLButtonElement).value === "Swap") {
      if (swap === true) {
        setSwap(false);
        bgSwap = "primary";
        buttonData = buttonData.filter((f) => f !== "swap");
      }
      if (swap === false) {
        setSwap(true);
        bgSwap = "secondary";
        buttonData.push("swap");
      }
      parentCallback(buttonData);
    }
  }

  console.log(buttonData);

  return (
    <div className="flex gap-2 px-2">
      <Button bgColor={bgFree} onClick={clickHandler} value={"Free"} />
      <Button bgColor={bgSwap} onClick={clickHandler} value={"Swap"} />
    </div>
  );
};

export default FilterButtons;
