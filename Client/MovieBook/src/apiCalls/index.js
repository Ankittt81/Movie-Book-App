import axios from "axios";

//Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8088/api",
  headers: { "Content-Type": "application/json" },
});

// we will use axios interceptors to add token to every request

//Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    //Get the token from local storage
    const token = localStorage.getItem("token");

    //Add the token to the Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


