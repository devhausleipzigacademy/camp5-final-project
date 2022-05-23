import axios from "axios";

export const getMapData = async () => {
  try {
    const mapData = await axios.get("/api/map");
    console.log("Map-Data:", mapData);
    return mapData.data;
  } catch (err) {
    console.error(err);
  }
};
