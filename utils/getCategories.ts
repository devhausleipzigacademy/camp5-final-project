import axios from "axios";

export const getCategories = async () => {
  try {
    const categories = await axios.get("/api/categories");
    console.log("Category-Data:", categories);
    return categories.data;
  } catch (err) {
    console.error(err);
  }
};
