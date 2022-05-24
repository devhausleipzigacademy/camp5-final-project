import axios from "axios";

export const getSwapItems = async () => {
  try {
    const swapItems = await axios.get("/api/map?sellType=SWAP");
    console.log("Map-Data:", swapItems);
    return swapItems.data;
  } catch (err) {
    console.error(err);
  }
};
