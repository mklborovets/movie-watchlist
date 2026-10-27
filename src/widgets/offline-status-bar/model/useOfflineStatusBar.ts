import {useOfflineSyncManager} from '@/features/offline-sync';

export type OfflineStatusType = 'offline' | 'syncing' | 'pending';

export interface UseOfflineStatusBarResult {
  isVisible: boolean;
  statusType: OfflineStatusType;
  message: string;
  isSyncing: boolean;
  canRetry: boolean;
  handleSyncPress: () => void;
  containerClassName: string;
}

export const useOfflineStatusBar = (): UseOfflineStatusBarResult => {
  const {isOnline, isSyncing, pendingCount, syncNow} = useOfflineSyncManager();

  const isOffline = !isOnline;
  const isVisible = isOffline || isSyncing || pendingCount > 0;

  let statusType: OfflineStatusType = 'offline';
  let message = 'Offline Mode - Showing cached catalog';
  let containerClassName = 'bg-amber-600/90 border-amber-500/50';

  if (isSyncing) {
    statusType = 'syncing';
    message = 'Syncing offline changes with TMDB...';
    containerClassName = 'bg-blue-600/90 border-blue-500/50';
  } else if (!isOffline && pendingCount > 0) {
    statusType = 'pending';
    message = `${pendingCount} pending offline mutations`;
    containerClassName = 'bg-amber-600/90 border-amber-500/50';
  }

  const handleSyncPress = () => {
    if (isOnline && !isSyncing) {
      syncNow();
    }
  };

  return {
    isVisible,
    statusType,
    message,
    isSyncing,
    canRetry: isOnline && !isSyncing && pendingCount > 0,
    handleSyncPress,
    containerClassName,
  };
};
