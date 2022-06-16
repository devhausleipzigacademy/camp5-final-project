import axios from "axios";

export const getItem = async (itemId: string) => {
  try {
    const uniqueItem = await axios.get(`/api/item?identifier=${itemId}`);
    console.log("Item:", uniqueItem);
    return uniqueItem.data;
  } catch (err) {
    console.error(err);
  }
};
