// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://upskilling-egypt.com:3003/api/v1", // ✅ Your API base URL
  headers: {
    Accept: "application/json",
  },
  withCredentials: false, // Change to true if you need cookies
});

// Optional: Add interceptors to log requests & responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
