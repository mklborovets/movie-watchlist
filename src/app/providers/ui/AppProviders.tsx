import React, {ReactNode} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryProvider} from './QueryProvider';
import {ThemeProvider} from './ThemeProvider';
import {OfflineSyncProvider} from './OfflineSyncProvider';

export interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({children}) => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <ThemeProvider>
          <OfflineSyncProvider>{children}</OfflineSyncProvider>
        </ThemeProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
};
