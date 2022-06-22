import axios from "axios";
import { Item } from "./types";

export const getProduct = async (id: string) => {
  try {
    const item = await axios.get(
      `http://localhost:3000/api/item?identifier=${id}`
    );
    console.log("from getProduct", id);
    return item.data;
  } catch (err) {
    console.error(err);
  }
};
