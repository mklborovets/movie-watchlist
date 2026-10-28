import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {ENV, API_TIMEOUT_MS} from '@/shared/config';

export const httpClient: AxiosInstance = axios.create({
  baseURL: ENV.tmdbApiBaseUrl.replace('https://', 'http://'),
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config.baseURL &&
      config.baseURL.startsWith('https://api.themoviedb.org')
    ) {
      config.baseURL = config.baseURL.replace('https://', 'http://');
    }
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
