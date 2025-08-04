import { axiosInstance } from ".";

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:8088/api/users/register",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:8088/api/users/login",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
