import axios from "axios";

export default async function getUser(userId: string) {
  try {
    const userData = await axios.get(`/api/user?identifier=${userId}`);
    console.log("User-Data:", userData);
    return userData.data;
  } catch (err) {
    console.error(err);
  }
}
