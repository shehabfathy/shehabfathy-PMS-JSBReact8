// src/api/axiosInstance.ts
import axios from "axios";
export const imgUrl = `https://upskilling-egypt.com:3006/`;
const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "https://upskilling-egypt.com:3003/api/v1", // ✅ Your API base URL
  headers: {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: false, // Change to true if you need cookies
});

export const authUrl = {
  login: `/Users/Login`,
};

export const taskUrl = {
  count: `/Task/count`,
};
export const userUrl = {
  count: `/Users/count`,
  AllUser: `/Users/Manager`,
  ActivateUser: (id: number) => `/Users/${id}`,
  filterUser: `/Users/`,
};

// Optional: Add interceptors to log requests & responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
