import {useEffect} from 'react';
import {useNetworkStatus} from '@/shared';
import {useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore} from './syncQueueStore';
import {syncPendingMutations} from './syncQueueRunner';

export interface UseOfflineSyncManagerResult {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  syncNow: () => Promise<void>;
}

let isQueueLoadStarted = false;
let isSavedMoviesLoadStarted = false;

export const useOfflineSyncStatus = (): UseOfflineSyncManagerResult => {
  const {isOnline} = useNetworkStatus();
  const pendingCount = useSyncQueueStore(state => state.queue.length);
  const isSyncing = useSyncQueueStore(state => state.isSyncing);

  return {
    isOnline,
    isSyncing,
    pendingCount,
    syncNow: syncPendingMutations,
  };
};

export const useOfflineSyncManager = (): UseOfflineSyncManagerResult => {
  const status = useOfflineSyncStatus();
  const {isOnline} = status;
  const queue = useSyncQueueStore(state => state.queue);
  const isSyncing = useSyncQueueStore(state => state.isSyncing);
  const loadPersistedQueue = useSyncQueueStore(
    state => state.loadPersistedQueue,
  );
  const isQueueInitialized = useSyncQueueStore(state => state.isInitialized);

  const loadPersistedSavedMovies = useSavedMoviesStore(
    state => state.loadPersistedSavedMovies,
  );
  const syncRemoteSavedMovies = useSavedMoviesStore(
    state => state.syncRemoteSavedMovies,
  );

  useEffect(() => {
    if (isQueueLoadStarted) {
      return;
    }
    isQueueLoadStarted = true;
    loadPersistedQueue();
  }, [loadPersistedQueue]);

  useEffect(() => {
    if (isSavedMoviesLoadStarted) {
      return;
    }
    isSavedMoviesLoadStarted = true;
    loadPersistedSavedMovies().then(async () => {
      if (useSavedMoviesStore.getState().isInitialized && isOnline) {
        await syncPendingMutations();
        await syncRemoteSavedMovies();
      }
    });
  }, [isOnline, loadPersistedSavedMovies, syncRemoteSavedMovies]);

  useEffect(() => {
    if (!isOnline || !isQueueInitialized || isSyncing || queue.length === 0) {
      return;
    }

    const now = Date.now();
    const dueItems = queue.filter(
      item => !item.nextRetryAt || item.nextRetryAt <= now,
    );

    if (dueItems.length > 0) {
      syncPendingMutations();
      return;
    }

    const earliest = Math.min(...queue.map(item => item.nextRetryAt ?? now));
    const timer = setTimeout(() => {
      syncPendingMutations();
    }, Math.max(earliest - now, 0));

    return () => clearTimeout(timer);
  }, [isOnline, isQueueInitialized, isSyncing, queue]);

  return status;
};
