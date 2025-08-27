import { axiosInstance } from ".";

//Registration flow
export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/users/register",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Login
export const LoginUser = async (values) => {
  console.log(values);
  try {
    const response = await axiosInstance.post(
      "/users/login",
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
      "/users/get-valid-user"
    );
    return response.data
  } catch (error) {

    console.log(error)
  }
}
