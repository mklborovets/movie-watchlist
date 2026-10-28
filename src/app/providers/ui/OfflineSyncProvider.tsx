import React, {ReactNode} from 'react';
import {useOfflineSyncProvider} from '../model/useOfflineSyncProvider';

export interface OfflineSyncProviderProps {
  children: ReactNode;
}

export const OfflineSyncProvider: React.FC<OfflineSyncProviderProps> = ({
  children,
}) => {
  useOfflineSyncProvider();

  return <>{children}</>;
};
