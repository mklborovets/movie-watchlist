import {create} from 'zustand';
import {STORAGE_KEYS, asyncStorageAdapter} from '@/shared';
import {Movie} from './types';
import {movieApi} from '../api/movieApi';
import {mapMovieDtoToMovie} from '../lib/mapMovieDto';

interface PersistedSavedMoviesData {
  watchlist: Movie[];
  favorites: Movie[];
}

export interface SavedMoviesState {
  watchlist: Movie[];
  favorites: Movie[];
  isInitialized: boolean;
  isSyncingRemote: boolean;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isMovieInWatchlist: (movieId: number) => boolean;
  isMovieInFavorites: (movieId: number) => boolean;
  loadPersistedSavedMovies: () => Promise<void>;
  setRemoteSavedMovies: (watchlist: Movie[], favorites: Movie[]) => void;
  syncRemoteSavedMovies: () => Promise<void>;
}

export const useSavedMoviesStore = create<SavedMoviesState>((set, get) => ({
  watchlist: [],
  favorites: [],
  isInitialized: false,
  isSyncingRemote: false,

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

  setRemoteSavedMovies: (watchlist: Movie[], favorites: Movie[]) => {
    set({watchlist, favorites});
    asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
      STORAGE_KEYS.savedMovies,
      {
        watchlist,
        favorites,
      },
    );
  },

  syncRemoteSavedMovies: async () => {
    try {
      set({isSyncingRemote: true});
      const [watchlistResponse, favoritesResponse] = await Promise.all([
        movieApi.fetchAccountWatchlist(1),
        movieApi.fetchAccountFavorites(1),
      ]);

      const watchlistMovies = watchlistResponse.results.map(mapMovieDtoToMovie);
      const favoriteMovies = favoritesResponse.results.map(mapMovieDtoToMovie);

      const deduplicatedWatchlist = Array.from(
        new Map(watchlistMovies.map(movie => [movie.id, movie])).values(),
      );
      const deduplicatedFavorites = Array.from(
        new Map(favoriteMovies.map(movie => [movie.id, movie])).values(),
      );

      set({
        watchlist: deduplicatedWatchlist,
        favorites: deduplicatedFavorites,
        isSyncingRemote: false,
      });

      await asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
        STORAGE_KEYS.savedMovies,
        {
          watchlist: deduplicatedWatchlist,
          favorites: deduplicatedFavorites,
        },
      );
    } catch {
      set({isSyncingRemote: false});
    }
  },
}));
