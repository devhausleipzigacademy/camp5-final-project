import axios from "axios";

export const getItem = async (itemId: string) => {
  try {
    const item = await axios.get(`/api/editproduct?identifier=${itemId}`);
    console.log("Item:", item);
    return item.data;
  } catch (err) {
    console.error(err);
  }
};
