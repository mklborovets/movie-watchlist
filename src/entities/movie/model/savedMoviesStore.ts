import {create} from 'zustand';
import {STORAGE_KEYS, asyncStorageAdapter} from '@/shared';
import {Movie} from './types';

interface PersistedSavedMoviesData {
  watchlist: Movie[];
  favorites: Movie[];
}

export interface SavedMoviesState {
  watchlist: Movie[];
  favorites: Movie[];
  isInitialized: boolean;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isMovieInWatchlist: (movieId: number) => boolean;
  isMovieInFavorites: (movieId: number) => boolean;
  loadPersistedSavedMovies: () => Promise<void>;
}

export const useSavedMoviesStore = create<SavedMoviesState>((set, get) => ({
  watchlist: [],
  favorites: [],
  isInitialized: false,

  addToWatchlist: (movie: Movie) => {
    const {watchlist, favorites} = get();
    if (watchlist.some(item => item.id === movie.id)) {
      return;
    }
    const nextWatchlist = [movie, ...watchlist];
    set({watchlist: nextWatchlist});
    asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
      STORAGE_KEYS.savedMovies,
      {
        watchlist: nextWatchlist,
        favorites,
      },
    );
  },

  removeFromWatchlist: (movieId: number) => {
    const {watchlist, favorites} = get();
    const nextWatchlist = watchlist.filter(item => item.id !== movieId);
    set({watchlist: nextWatchlist});
    asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
      STORAGE_KEYS.savedMovies,
      {
        watchlist: nextWatchlist,
        favorites,
      },
    );
  },

  addToFavorites: (movie: Movie) => {
    const {watchlist, favorites} = get();
    if (favorites.some(item => item.id === movie.id)) {
      return;
    }
    const nextFavorites = [movie, ...favorites];
    set({favorites: nextFavorites});
    asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
      STORAGE_KEYS.savedMovies,
      {
        watchlist,
        favorites: nextFavorites,
      },
    );
  },

  removeFromFavorites: (movieId: number) => {
    const {watchlist, favorites} = get();
    const nextFavorites = favorites.filter(item => item.id !== movieId);
    set({favorites: nextFavorites});
    asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
      STORAGE_KEYS.savedMovies,
      {
        watchlist,
        favorites: nextFavorites,
      },
    );
  },

  isMovieInWatchlist: (movieId: number) => {
    return get().watchlist.some(item => item.id === movieId);
  },

  isMovieInFavorites: (movieId: number) => {
    return get().favorites.some(item => item.id === movieId);
  },

  loadPersistedSavedMovies: async () => {
    const persisted =
      await asyncStorageAdapter.getItem<PersistedSavedMoviesData>(
        STORAGE_KEYS.savedMovies,
      );
    if (persisted) {
      set({
        watchlist: persisted.watchlist || [],
        favorites: persisted.favorites || [],
        isInitialized: true,
      });
      return;
    }
    set({isInitialized: true});
  },
}));
