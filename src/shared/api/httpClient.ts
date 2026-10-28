import {Platform} from 'react-native';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {ENV, API_TIMEOUT_MS} from '@/shared/config';

const resolveBaseUrl = (): string => {
  if (
    Platform.OS === 'android' &&
    ENV.tmdbApiBaseUrl.startsWith('https://api.themoviedb.org')
  ) {
    return ENV.tmdbApiBaseUrl.replace('https://', 'http://');
  }
  return ENV.tmdbApiBaseUrl;
};

export const httpClient: AxiosInstance = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      Platform.OS === 'android' &&
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
