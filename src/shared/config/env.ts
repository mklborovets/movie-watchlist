import {
  TMDB_API_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  TMDB_BEARER_TOKEN,
  TMDB_ACCOUNT_ID,
} from '@env';

export const ENV = {
  tmdbApiBaseUrl: TMDB_API_BASE_URL || 'https://api.themoviedb.org/3',
  tmdbImageBaseUrl: TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  tmdbBearerToken: TMDB_BEARER_TOKEN || '',
  tmdbAccountId: TMDB_ACCOUNT_ID || '',
};
