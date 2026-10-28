import {queryClient, asyncStoragePersister} from '@/shared';

export const useQueryProvider = () => {
  return {
    client: queryClient,
    persistOptions: {
      persister: asyncStoragePersister,
    },
  };
};
