import axios from "axios";

// ✅ PRIMARY: Render backend (no CORS issues)
// SECONDARY: GoDaddy domain (only if Render fails)
const BACKENDS = [
  import.meta.env.VITE_API_URL_SECONDARY ||
  "https://terzooproductsbackend-9yc4.onrender.com", // ← Render (Primary - CORS OK)

  import.meta.env.VITE_API_URL ||
  "https://api.trazooglobal.com", // ← GoDaddy (Backup)
];

let currentBackendIndex = 0;

const API = axios.create({
  baseURL: BACKENDS[currentBackendIndex],
  timeout: 8000,
  withCredentials: true,
});

console.log(`🚀 API initialized with: ${BACKENDS[currentBackendIndex]}`);

// ✅ Request Interceptor - Token add karo
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 Request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - Failover logic
API.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from: ${response.config.baseURL}${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Network error, connection abort, ya timeout
    if (
      error.code === "ECONNABORTED" ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error" ||
      !error.response
    ) {
      console.warn(
        `⚠️ Backend failed: ${BACKENDS[currentBackendIndex]}`
      );

      // Agar already last backend par ho toh don't retry
      if (currentBackendIndex >= BACKENDS.length - 1) {
        console.error("❌ All backends failed");
        return Promise.reject(error);
      }

      // Switch to next backend
      currentBackendIndex = (currentBackendIndex + 1) % BACKENDS.length;
      console.log(`🔄 Switching to backup: ${BACKENDS[currentBackendIndex]}`);

      API.defaults.baseURL = BACKENDS[currentBackendIndex];

      // Retry request with new backend
      return API.request(originalRequest);
    }

    // CORS error - log and don't retry
    if (error.message.includes("CORS")) {
      console.error(`❌ CORS Error from ${BACKENDS[currentBackendIndex]}`);
      return Promise.reject(error);
    }

    // Auth error - redirect to login
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - redirecting to login");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;