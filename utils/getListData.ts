import axios from "axios";

export const getListData = async () => {
  try {
    const listData = await axios.get("/api/list");
    console.log("List-Data:", listData);
    return listData.data;
  } catch (err) {
    console.error(err);
  }
};
