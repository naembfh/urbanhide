import axios from "axios";
import Cookies from "js-cookie";
import { getNewAccessToken } from "@/services/AuthService";

const clientAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Attach the access token from cookies to each request
clientAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");  // Read from cookies
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token on 401 error and retry the original request
clientAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await getNewAccessToken();
        const newAccessToken = res.data.accessToken;

        // Set the new token in cookies
        Cookies.set("accessToken", newAccessToken, { secure: true, sameSite: "Strict" });
        
        // Update original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the updated token
        return clientAxiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, remove token and redirect to login if necessary
        Cookies.remove("accessToken");
        // Optionally, redirect to login page here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default clientAxiosInstance;
