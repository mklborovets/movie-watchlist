import {useOfflineSyncManager} from '@/features/offline-sync';

export const useOfflineSyncProvider = () => {
  useOfflineSyncManager();
};
