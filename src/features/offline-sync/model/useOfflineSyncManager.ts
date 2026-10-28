import {useEffect, useCallback} from 'react';
import {useNetworkStatus, tmdbAccountApi} from '@/shared';
import {useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore, SyncQueueItem} from './syncQueueStore';

export interface UseOfflineSyncManagerResult {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  syncNow: () => Promise<void>;
}

export const useOfflineSyncManager = (): UseOfflineSyncManagerResult => {
  const {isOnline} = useNetworkStatus();
  const queue = useSyncQueueStore(state => state.queue);
  const isSyncing = useSyncQueueStore(state => state.isSyncing);
  const isInitialized = useSyncQueueStore(state => state.isInitialized);
  const loadPersistedQueue = useSyncQueueStore(
    state => state.loadPersistedQueue,
  );
  const dequeueMutation = useSyncQueueStore(state => state.dequeueMutation);
  const setIsSyncing = useSyncQueueStore(state => state.setIsSyncing);

  const isSavedMoviesInitialized = useSavedMoviesStore(
    state => state.isInitialized,
  );
  const loadPersistedSavedMovies = useSavedMoviesStore(
    state => state.loadPersistedSavedMovies,
  );
  const syncRemoteSavedMovies = useSavedMoviesStore(
    state => state.syncRemoteSavedMovies,
  );

  useEffect(() => {
    if (!isInitialized) {
      loadPersistedQueue();
    }
  }, [isInitialized, loadPersistedQueue]);

  useEffect(() => {
    if (!isSavedMoviesInitialized) {
      loadPersistedSavedMovies().then(() => {
        if (isOnline) {
          syncRemoteSavedMovies();
        }
      });
    }
  }, [
    isSavedMoviesInitialized,
    loadPersistedSavedMovies,
    isOnline,
    syncRemoteSavedMovies,
  ]);

  const executeItem = async (item: SyncQueueItem): Promise<boolean> => {
    try {
      switch (item.action) {
        case 'ADD_WATCHLIST':
          await tmdbAccountApi.toggleWatchlist({
            mediaId: item.movieId,
            watchlist: true,
          });
          return true;
        case 'REMOVE_WATCHLIST':
          await tmdbAccountApi.toggleWatchlist({
            mediaId: item.movieId,
            watchlist: false,
          });
          return true;
        case 'ADD_FAVORITE':
          await tmdbAccountApi.toggleFavorite({
            mediaId: item.movieId,
            favorite: true,
          });
          return true;
        case 'REMOVE_FAVORITE':
          await tmdbAccountApi.toggleFavorite({
            mediaId: item.movieId,
            favorite: false,
          });
          return true;
        default:
          return true;
      }
    } catch {
      return false;
    }
  };

  const syncNow = useCallback(async () => {
    const currentQueue = useSyncQueueStore.getState().queue;
    if (!isOnline || currentQueue.length === 0 || isSyncing) {
      return;
    }

    setIsSyncing(true);

    for (const item of currentQueue) {
      const success = await executeItem(item);
      if (success) {
        dequeueMutation(item.id);
      }
    }

    await syncRemoteSavedMovies();
    setIsSyncing(false);
  }, [
    isOnline,
    isSyncing,
    setIsSyncing,
    dequeueMutation,
    syncRemoteSavedMovies,
  ]);

  useEffect(() => {
    if (isOnline && queue.length > 0 && !isSyncing) {
      syncNow();
    }
  }, [isOnline, queue.length, isSyncing, syncNow]);

  return {
    isOnline,
    isSyncing,
    pendingCount: queue.length,
    syncNow,
  };
};
