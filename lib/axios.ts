import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8000/api/v1",
  withCredentials: true, // cookies / auth ke liye
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Response interceptor (optional but powerful)
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";

    return Promise.reject({
      message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
  }
);

export default api;
