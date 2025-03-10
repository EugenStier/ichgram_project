import { $api } from "../api";
export const getUserByIdApi = async (userId: string) => {
  try {
    const { data } = await $api.get("/user/${userId}");
    return DataTransfer;
  } catch (e) {
    console.error(e);
    throw new Error("Error getting user");
  }
};
