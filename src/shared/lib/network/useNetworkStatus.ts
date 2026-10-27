import {useEffect, useState} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
  isOnline: boolean;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    isOnline: true,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const connected = Boolean(state.isConnected);
      const reachable =
        state.isInternetReachable === null
          ? true
          : Boolean(state.isInternetReachable);
      setNetworkStatus({
        isConnected: connected,
        isInternetReachable: reachable,
        isOnline: connected && reachable,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
};
