export const API_TIMEOUT_MS = 15000;

export const TMDB_IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
} as const;

export const STORAGE_KEYS = {
  savedMovies: 'movie_watchlist_saved_movies',
  syncQueue: 'movie_watchlist_sync_queue',
  theme: 'movie_watchlist_theme_mode',
  queryCache: 'movie_watchlist_query_cache',
} as const;

export const QUERY_GC_TIME = 1000 * 60 * 60 * 24;
export const QUERY_STALE_TIME = 1000 * 60 * 5;
