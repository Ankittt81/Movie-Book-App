import { axiosInstance } from "./index";

export const getMovies = async ({ title = "", page = 0, pageSize = 50 } = {}) => {
  const response = await axiosInstance.get("/movies", {
    params: { title, page, pageSize },
  });
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await axiosInstance.get(`/movies/${id}`);
  return response.data;
};

export const createMovie = async (payload) => {
  const response = await axiosInstance.post("/movies", payload);
  return response.data;
};

export const updateMovie = async (id, payload) => {
  const response = await axiosInstance.put(`/movies/${id}`, payload);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await axiosInstance.delete(`/movies/${id}`);
  return response.data;
};