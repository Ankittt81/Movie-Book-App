import {axiosInstance} from './index'

export const addShow=async (payload)=>{
    try {
        const response = await axiosInstance.post("/shows/add-show",payload);
        return response.data
    } catch (err) {
        return err.message
    }
}

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/shows/update-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/shows/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};


export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/shows/delete-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};


export const getAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/shows/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};


export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/shows/get-show-by-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
