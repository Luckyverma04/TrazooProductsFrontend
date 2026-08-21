import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://terzooproductsbackend-1.onrender.com";

const API = axios.create({
  baseURL: API_URL,
  timeout: 12000,
  withCredentials: true,
});

console.log(`🚀 API initialized with: ${API_URL}`);

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`📤 Request to: ${API_URL}${config.url}`);

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    console.log(
      `✅ Response from: ${response.config.baseURL}${response.config.url}`
    );

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - redirecting to login");

      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;