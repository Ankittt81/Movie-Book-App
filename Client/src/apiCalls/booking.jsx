import { axiosInstance } from ".";

export const holdSeats = async (showId, seatLabels) => {
  const response = await axiosInstance.post("/bookings/hold", { showId, seatLabels });
  return response.data;
};

export const confirmBooking = async (bookingId) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/confirm`);
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/cancel`);
  return response.data;
};

export const getMyBookings = async (page = 0, pageSize = 10) => {
  const response = await axiosInstance.get("/bookings/my", {
    params: { page, pageSize },
  });
  return response.data;
};