import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {ENV, API_TIMEOUT_MS} from '@/shared/config';

export const httpClient: AxiosInstance = axios.create({
  baseURL: ENV.tmdbApiBaseUrl,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (ENV.tmdbBearerToken) {
      config.headers.Authorization = `Bearer ${ENV.tmdbBearerToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
