// src/api/axiosInstance.ts
import axios from "axios";

export const imgUrl = `https://upskilling-egypt.com:3006/`;

const axiosInstance = axios.create({
  baseURL: "https://upskilling-egypt.com:3003/api/v1", // ✅ API base URL
  headers: {
    Accept: "application/json",
  },
  withCredentials: false, // Change to true if you need cookies
});

// 🔑 Inject the latest token into every request dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // cleanup if no token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authUrl = {
  login: `/Users/Login`,
};

export const taskUrl = {
  count: `/Task/count`,
  getAllManager: `/Task/manager`,
  GET_EMPLOYEE_TASKS: `/Task?pageSize=50&pageNumber=1`,
  createTask: `/Task`,
  EDIT_TASKS_BY_EMPLOYEE: (id: number) => `/Task/${id}/change-status`,
  updateTask: (id: number) => `/Task/${id}`,
  deleteTask: (id: number) => `/Task/${id}`,
  changeStatus: (id: number) => `/Task/${id}/change-status`,
  filterTask: `/Task/`,
};

export const userUrl = {
  count: `/Users/count`,
  AllUser: `/Users/Manager`,
  ActivateUser: (id: number) => `/Users/${id}`,
  filterUser: `/Users/`,
};

export const projectUrl = {
  count: `/Projects/count`,
  AllProjectsManager: `/Project/manager`,
  AllProjectsEmployee: `/Project/employee`,
  ActivateProject: (id: number) => `/Projects/${id}`,
  filterProject: `/Projects/`,
};

// Optional: log API responses & errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
