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

//to get current or valid user

export const GetCurrentUser=async ()=>{
  try {
    const response = await axiosInstance.get(
      "http://localhost:8088/api/users/get-valid-user"
    );
    return response.data
  } catch (error) {

    console.log(error)
  }
}
