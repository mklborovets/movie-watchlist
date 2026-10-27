import {create} from 'zustand';
import {STORAGE_KEYS, asyncStorageAdapter} from '@/shared';

export type SyncActionType =
  | 'ADD_WATCHLIST'
  | 'REMOVE_WATCHLIST'
  | 'ADD_FAVORITE'
  | 'REMOVE_FAVORITE';

export interface SyncQueueItem {
  id: string;
  action: SyncActionType;
  movieId: number;
  timestamp: number;
}

export interface SyncQueueState {
  queue: SyncQueueItem[];
  isSyncing: boolean;
  isInitialized: boolean;
  enqueueMutation: (action: SyncActionType, movieId: number) => void;
  dequeueMutation: (id: string) => void;
  clearQueue: () => void;
  setIsSyncing: (isSyncing: boolean) => void;
  loadPersistedQueue: () => Promise<void>;
}

const isOppositeAction = (
  first: SyncActionType,
  second: SyncActionType,
): boolean => {
  if (
    (first === 'ADD_WATCHLIST' && second === 'REMOVE_WATCHLIST') ||
    (first === 'REMOVE_WATCHLIST' && second === 'ADD_WATCHLIST')
  ) {
    return true;
  }
  if (
    (first === 'ADD_FAVORITE' && second === 'REMOVE_FAVORITE') ||
    (first === 'REMOVE_FAVORITE' && second === 'ADD_FAVORITE')
  ) {
    return true;
  }
  return false;
};

export const useSyncQueueStore = create<SyncQueueState>((set, get) => ({
  queue: [],
  isSyncing: false,
  isInitialized: false,

  enqueueMutation: (action: SyncActionType, movieId: number) => {
    const currentQueue = get().queue;
    const existingOppositeIndex = currentQueue.findIndex(
      item => item.movieId === movieId && isOppositeAction(item.action, action),
    );

    if (existingOppositeIndex !== -1) {
      const nextQueue = currentQueue.filter(
        (_, index) => index !== existingOppositeIndex,
      );
      set({queue: nextQueue});
      asyncStorageAdapter.setItem<SyncQueueItem[]>(
        STORAGE_KEYS.syncQueue,
        nextQueue,
      );
      return;
    }

    const existingIdenticalIndex = currentQueue.findIndex(
      item => item.movieId === movieId && item.action === action,
    );

    if (existingIdenticalIndex !== -1) {
      return;
    }

    const newItem: SyncQueueItem = {
      id: `${action}_${movieId}_${Date.now()}`,
      action,
      movieId,
      timestamp: Date.now(),
    };

    const nextQueue = [...currentQueue, newItem];
    set({queue: nextQueue});
    asyncStorageAdapter.setItem<SyncQueueItem[]>(
      STORAGE_KEYS.syncQueue,
      nextQueue,
    );
  },

  dequeueMutation: (id: string) => {
    const nextQueue = get().queue.filter(item => item.id !== id);
    set({queue: nextQueue});
    asyncStorageAdapter.setItem<SyncQueueItem[]>(
      STORAGE_KEYS.syncQueue,
      nextQueue,
    );
  },

  clearQueue: () => {
    set({queue: []});
    asyncStorageAdapter.removeItem(STORAGE_KEYS.syncQueue);
  },

  setIsSyncing: (isSyncing: boolean) => {
    set({isSyncing});
  },

  loadPersistedQueue: async () => {
    const persisted = await asyncStorageAdapter.getItem<SyncQueueItem[]>(
      STORAGE_KEYS.syncQueue,
    );
    if (persisted) {
      set({queue: persisted, isInitialized: true});
      return;
    }
    set({isInitialized: true});
  },
}));
