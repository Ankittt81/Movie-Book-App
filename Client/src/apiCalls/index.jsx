import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// turn every failure into an Error carrying the backend's message,
// so pages only need: catch (err) { message.error(err.message) }
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    let text = error.response?.data?.message;
    if (!text) {
      if (!error.response) text = "Cannot reach the server";
      else if (status === 401) text = "Please login again";
      else text = "Something went wrong";
    }
    const err = new Error(text);
    err.status = status;
    return Promise.reject(err);
  }
);