import { axiosInstance } from ".";

export const GetAllMovies = async ()=>{
    try {
        const response = await axiosInstance.get(
          "http://localhost:8088/api/movies/get-all-movies"
        );
        return response.data
    } catch (error) {
        console.log(error)
    }
}