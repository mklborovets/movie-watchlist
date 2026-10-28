import {create} from 'zustand';
import {STORAGE_KEYS, asyncStorageAdapter, ENV} from '@/shared';
import {Movie} from './types';
import {movieApi} from '../api/movieApi';
import {mapMovieDtoToMovie} from '../lib/mapMovieDto';

interface PersistedSavedMoviesData {
  watchlist: Movie[];
  favorites: Movie[];
}

export type PendingSavedMovieMutation = {
  action:
    | 'ADD_WATCHLIST'
    | 'REMOVE_WATCHLIST'
    | 'ADD_FAVORITE'
    | 'REMOVE_FAVORITE';
  movieId: number;
};

const MAX_REMOTE_PAGES = 10;

const dedupeById = (movies: Movie[]): Movie[] =>
  Array.from(new Map(movies.map(movie => [movie.id, movie])).values());

const fetchAllPages = async (
  fetchPage: (page: number) => Promise<{
    results: Parameters<typeof mapMovieDtoToMovie>[0][];
    total_pages: number;
  }>,
): Promise<Movie[]> => {
  const first = await fetchPage(1);
  const movies = first.results.map(mapMovieDtoToMovie);
  const lastPage = Math.min(first.total_pages || 1, MAX_REMOTE_PAGES);
  for (let page = 2; page <= lastPage; page++) {
    const next = await fetchPage(page);
    movies.push(...next.results.map(mapMovieDtoToMovie));
  }
  return dedupeById(movies);
};

const applyPending = (
  remote: Movie[],
  local: Movie[],
  pending: PendingSavedMovieMutation[],
  addAction: PendingSavedMovieMutation['action'],
  removeAction: PendingSavedMovieMutation['action'],
): Movie[] => {
  let result = remote;
  for (const mutation of pending) {
    if (mutation.action === removeAction) {
      result = result.filter(movie => movie.id !== mutation.movieId);
    } else if (mutation.action === addAction) {
      const localMovie = local.find(movie => movie.id === mutation.movieId);
      if (localMovie && !result.some(movie => movie.id === localMovie.id)) {
        result = [localMovie, ...result];
      }
    }
  }
  return result;
};

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
  syncRemoteSavedMovies: (
    getPending?: () => PendingSavedMovieMutation[],
  ) => Promise<void>;
}

const persistSavedMovies = (
  watchlist: Movie[],
  favorites: Movie[],
): Promise<void> => {
  return asyncStorageAdapter.setItem<PersistedSavedMoviesData>(
    STORAGE_KEYS.savedMovies,
    {
      watchlist,
      favorites,
    },
  );
};

let isSavedMoviesLoading = false;

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
    persistSavedMovies(nextWatchlist, favorites);
  },

  removeFromWatchlist: (movieId: number) => {
    const {watchlist, favorites} = get();
    const nextWatchlist = watchlist.filter(item => item.id !== movieId);
    set({watchlist: nextWatchlist});
    persistSavedMovies(nextWatchlist, favorites);
  },

  addToFavorites: (movie: Movie) => {
    const {watchlist, favorites} = get();
    if (favorites.some(item => item.id === movie.id)) {
      return;
    }
    const nextFavorites = [movie, ...favorites];
    set({favorites: nextFavorites});
    persistSavedMovies(watchlist, nextFavorites);
  },

  removeFromFavorites: (movieId: number) => {
    const {watchlist, favorites} = get();
    const nextFavorites = favorites.filter(item => item.id !== movieId);
    set({favorites: nextFavorites});
    persistSavedMovies(watchlist, nextFavorites);
  },

  isMovieInWatchlist: (movieId: number) => {
    return get().watchlist.some(item => item.id === movieId);
  },

  isMovieInFavorites: (movieId: number) => {
    return get().favorites.some(item => item.id === movieId);
  },

  loadPersistedSavedMovies: async () => {
    if (get().isInitialized || isSavedMoviesLoading) {
      return;
    }
    isSavedMoviesLoading = true;
    try {
      const persisted =
        await asyncStorageAdapter.getItem<PersistedSavedMoviesData>(
          STORAGE_KEYS.savedMovies,
        );
      if (persisted) {
        const watchlist = Array.isArray(persisted.watchlist)
          ? persisted.watchlist
          : [];
        const favorites = Array.isArray(persisted.favorites)
          ? persisted.favorites
          : [];
        set({
          watchlist,
          favorites,
          isInitialized: true,
        });
        return;
      }
      set({isInitialized: true});
    } catch (error) {
      console.warn(
        '[savedMoviesStore] loadPersistedSavedMovies failed:',
        error,
      );
      set({isInitialized: true});
    } finally {
      isSavedMoviesLoading = false;
    }
  },

  setRemoteSavedMovies: (watchlist: Movie[], favorites: Movie[]) => {
    set({watchlist, favorites});
    persistSavedMovies(watchlist, favorites);
  },

  syncRemoteSavedMovies: async getPending => {
    if (get().isSyncingRemote) {
      return;
    }
    if (!ENV.tmdbAccountId || !ENV.tmdbBearerToken) {
      return;
    }
    try {
      set({isSyncingRemote: true});
      const [remoteWatchlist, remoteFavorites] = await Promise.all([
        fetchAllPages(page => movieApi.fetchAccountWatchlist(page)),
        fetchAllPages(page => movieApi.fetchAccountFavorites(page)),
      ]);

      const pending = getPending ? getPending() : [];
      const local = get();
      const nextWatchlist = applyPending(
        remoteWatchlist,
        local.watchlist,
        pending,
        'ADD_WATCHLIST',
        'REMOVE_WATCHLIST',
      );
      const nextFavorites = applyPending(
        remoteFavorites,
        local.favorites,
        pending,
        'ADD_FAVORITE',
        'REMOVE_FAVORITE',
      );

      set({
        watchlist: nextWatchlist,
        favorites: nextFavorites,
        isSyncingRemote: false,
      });

      await persistSavedMovies(nextWatchlist, nextFavorites);
    } catch {
      set({isSyncingRemote: false});
    }
  },
}));
