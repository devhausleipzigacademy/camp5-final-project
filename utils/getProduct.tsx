import axios from "axios";
import { Item } from "./types";

export const getProduct = async (id: string) => {
  try {
    const item = await axios.get(`/api/item?identifier=${id}`);
    return item.data;
  } catch (err) {
    console.error(err);
  }
};
