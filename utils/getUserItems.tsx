import axios from "axios";

export async function fetchUserItems(userId: string) {
    try {
        const listData = await axios.get(`/api/items/?=${userId}`);

        return listData.data;
    } catch (err) {
        console.error(err);
    }
}
