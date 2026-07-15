import axios from "axios";

const deployedLink = "https://backend.ayushsingh231501.workers.dev";


const api = axios.create({
  baseURL: deployedLink,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;