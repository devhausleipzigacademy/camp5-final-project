import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      <button
        className="bg-primary text-primary-text flex-grow py-2 rounded-sm"
        onClick={clickHandler("FREE")}
      >
        Free
      </button>
      <button
        className="bg-primary text-primary-text flex-grow py-2 rounded-sm"
        onClick={clickHandler("SWAP")}
      >
        Swap
      </button>
    </div>
  );
};

export default FilterButtons;
