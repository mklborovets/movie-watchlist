import NetInfo from '@react-native-community/netinfo';
import {AxiosError} from 'axios';
import {tmdbAccountApi} from '@/shared';
import {ENV} from '@/shared/config';
import {useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore, SyncQueueItem} from './syncQueueStore';

export const MAX_SYNC_RETRIES = 5;
const BASE_BACKOFF_MS = 2000;
const MAX_BACKOFF_MS = 60000;

const isSyncConfigured = (): boolean =>
  Boolean(ENV.tmdbBearerToken && ENV.tmdbAccountId);

const getBackoffMs = (retryCount: number): number =>
  Math.min(BASE_BACKOFF_MS * 2 ** (retryCount - 1), MAX_BACKOFF_MS);

const isPermanentError = (error: unknown): boolean => {
  const status = (error as AxiosError)?.response?.status;
  return (
    typeof status === 'number' &&
    status >= 400 &&
    status < 500 &&
    status !== 408 &&
    status !== 429
  );
};

const executeItem = async (item: SyncQueueItem): Promise<void> => {
  switch (item.action) {
    case 'ADD_WATCHLIST':
      await tmdbAccountApi.toggleWatchlist({
        mediaId: item.movieId,
        watchlist: true,
      });
      return;
    case 'REMOVE_WATCHLIST':
      await tmdbAccountApi.toggleWatchlist({
        mediaId: item.movieId,
        watchlist: false,
      });
      return;
    case 'ADD_FAVORITE':
      await tmdbAccountApi.toggleFavorite({
        mediaId: item.movieId,
        favorite: true,
      });
      return;
    case 'REMOVE_FAVORITE':
      await tmdbAccountApi.toggleFavorite({
        mediaId: item.movieId,
        favorite: false,
      });
      return;
    default:
      console.warn(
        `[syncQueueRunner] Unknown action: ${(item as SyncQueueItem).action}`,
      );
      return;
  }
};
export const syncPendingMutations = async (): Promise<void> => {
  const store = useSyncQueueStore.getState();
  if (store.isSyncing || store.queue.length === 0 || !isSyncConfigured()) {
    return;
  }

  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    return;
  }

  if (useSyncQueueStore.getState().isSyncing) {
    return;
  }
  useSyncQueueStore.getState().setIsSyncing(true);

  try {
    const snapshot = [...useSyncQueueStore.getState().queue];
    for (const item of snapshot) {
      if (item.nextRetryAt && item.nextRetryAt > Date.now()) {
        continue;
      }
      try {
        await executeItem(item);
        useSyncQueueStore.getState().dequeueMutation(item.id);
      } catch (error) {
        const retryCount = (item.retryCount ?? 0) + 1;
        if (isPermanentError(error) || retryCount >= MAX_SYNC_RETRIES) {
          useSyncQueueStore.getState().dequeueMutation(item.id);
        } else {
          useSyncQueueStore.getState().updateMutation(item.id, {
            retryCount,
            nextRetryAt: Date.now() + getBackoffMs(retryCount),
          });
        }
      }
    }
  } finally {
    useSyncQueueStore.getState().setIsSyncing(false);
  }
};

export const refreshSavedMovies = async (): Promise<void> => {
  if (!isSyncConfigured()) {
    return;
  }
  await syncPendingMutations();
  await useSavedMoviesStore
    .getState()
    .syncRemoteSavedMovies(() => useSyncQueueStore.getState().queue);
};
