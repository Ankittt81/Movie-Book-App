import { axiosInstance } from "./index";

export const smartSearch = async (q) => {
  const response = await axiosInstance.get("/search", { params: { q } });
  return response.data;
};