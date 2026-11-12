import { axiosInstance } from ".";

export const registerUser = async (values) => {
  const response = await axiosInstance.post("/auth/register", values);
  return response.data;
};

// token arrives in the Authorization header, user in the body
export const loginUser = async (values) => {
  const response = await axiosInstance.post("/auth/login", values);
  const bearer = response.headers.authorization || "";
  return {
    token: bearer.replace("Bearer ", ""),
    user: response.data.data,
    message: response.data.message,
  };
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};