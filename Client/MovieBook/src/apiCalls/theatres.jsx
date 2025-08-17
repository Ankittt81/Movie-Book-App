
import { axiosInstance } from "./index";


export const addTheatre=async (payload)=>{
    try {
        const response = await axiosInstance.post(
          "http://localhost:8088/api/theatre/add-theatre",payload
        );
        return response.data
    } catch (err) {
        return err.response
    }
}

//Get all theatres for the Admin route

export const getAllTheatresForAdmin = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:8088/api/theatre/get-all-theatres");
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//Get theatres of a specific owner
export const getAllTheatres = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:8088/api/theatre/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//Update Theatre
export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "http://localhost:8088/api/theatre/update-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//Delete Theatre
export const DeleteTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.delete(
      `http://localhost:8088/api/theatre/delete-theatre/${theatreId}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};