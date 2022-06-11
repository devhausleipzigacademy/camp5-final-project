import axios from "axios";

export const getUserItems = async (userId: string) => {
  try {
    const userItems = await axios.get(`/api/useritems?userId=${userId}`);
    console.log("User-Items:", userItems);
    return userItems.data;
  } catch (err) {
    console.error(err);
  }
};
