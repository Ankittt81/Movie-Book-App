import { axiosInstance } from "./index";


//get all movies
export const GetAllMovies = async ()=>{
    try {
        const response = await axiosInstance.get(
          "/movies/get-all-movies"
        );
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//add a movie
export const addMovie=async(values)=>{
    try {
        const response = await axiosInstance.post(
          "/movies/add-movie",values
        );
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//update movie

export const updateMovie=async (payload)=>{
    try {
        const response = await axiosInstance.put(
          "/movies/update-movie",payload
        );
        return response.data
    } catch (err) {
        return err.message
    }
}

//Delete a movie

export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

//Get a single movie by its id
export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/movies/movie/${id}`
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};