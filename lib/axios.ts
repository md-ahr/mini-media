import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { clearTokens, getTokens, setTokens } from "./auth";
import { API_CONFIG } from "./constants";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const tokens = await getTokens();
      if (tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
    } catch (error) {
      console.error("Error getting tokens in request interceptor:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getTokens();

        if (tokens?.refreshToken) {
          const refreshResponse = await axios.post(
            `${API_CONFIG.baseUrl}/users/refresh-token`,
            { refreshToken: tokens.refreshToken },
            { timeout: API_CONFIG.timeout }
          );

          if (refreshResponse.data.success && refreshResponse.data.data) {
            const newTokens = refreshResponse.data.data;

            await setTokens(newTokens);

            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        await clearTokens();
      }
    }

    return Promise.reject(error);
  }
);

export { api };
