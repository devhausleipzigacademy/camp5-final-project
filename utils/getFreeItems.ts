import axios from "axios";

export const getFreeItems = async () => {
  try {
    const freeItems = await axios.get("/api/map?sellType=FREE");
    console.log("Map-Data:", freeItems);
    return freeItems.data;
  } catch (err) {
    console.error(err);
  }
};
