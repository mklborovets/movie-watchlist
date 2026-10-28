import React, {ReactNode} from 'react';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {useQueryProvider} from '../model/useQueryProvider';

export interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({children}) => {
  const {client, persistOptions} = useQueryProvider();

  return (
    <PersistQueryClientProvider client={client} persistOptions={persistOptions}>
      {children}
    </PersistQueryClientProvider>
  );
};
