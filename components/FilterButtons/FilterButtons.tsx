import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "./Button/Button";

const FilterButtons = () => {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();
  const axios = require("axios");

  async function clickHandler(selltype: string) {
    try {
      const fetchedItems: Item[] = await axios.get(
        `http://localhost:3000/api/items?sellType=${selltype}`
      );
    } catch (err) {
      console.log(err);
    }
    useEffect((fetchedItems) => setItems(), [items]);
  }
  return (
    <div className="flex gap-2">
      <Button bgColor={"primary"} text={"Free"} />

      <Button bgColor={"primary"} text={"Swap"} />
    </div>
  );
};

export default FilterButtons;
