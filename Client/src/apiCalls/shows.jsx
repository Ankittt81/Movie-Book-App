import { axiosInstance } from "./index";

// partner
export const createShow = async (payload) => {
  const response = await axiosInstance.post("/shows", payload);
  return response.data;
};

export const getShowsOfTheatre = async (theatreId, page = 0, pageSize = 50) => {
  const response = await axiosInstance.get(`/theatres/${theatreId}/shows`, {
    params: { page, pageSize },
  });
  return response.data;
};

// customer: theatres with their shows for one movie on one day (date = "YYYY-MM-DD")
export const getShowsForMovie = async (movieId, date) => {
  const response = await axiosInstance.get("/shows", {
    params: { movieId, date },
  });
  return response.data;
};

export const getSeatMap = async (showId) => {
  const response = await axiosInstance.get(`/shows/${showId}/seats`);
  return response.data;
};