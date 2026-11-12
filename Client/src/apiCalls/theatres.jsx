import { axiosInstance } from "./index";

// partner
export const createTheatre = async (payload) => {
  const response = await axiosInstance.post("/theatres", payload);
  return response.data;
};

export const getMyTheatres = async (page = 0, pageSize = 50) => {
  const response = await axiosInstance.get("/theatres/my", {
    params: { page, pageSize },
  });
  return response.data;
};

export const updateTheatre = async (id, payload) => {
  const response = await axiosInstance.put(`/theatres/${id}`, payload);
  return response.data;
};

// admin
export const getTheatresByStatus = async (status = "PENDING", page = 0, pageSize = 50) => {
  const response = await axiosInstance.get("/admin/theatres", {
    params: { status, page, pageSize },
  });
  return response.data;
};

export const changeTheatreStatus = async (id, status) => {
  const response = await axiosInstance.put(`/admin/theatres/${id}/status`, { status });
  return response.data;
};