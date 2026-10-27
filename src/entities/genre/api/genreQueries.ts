import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {genreApi} from './genreApi';
import {Genre} from '../model/types';

export const genreQueryKeys = {
  all: ['genres'] as const,
  list: () => [...genreQueryKeys.all, 'list'] as const,
};

export const useGenresQuery = (): UseQueryResult<Genre[], Error> => {
  return useQuery({
    queryKey: genreQueryKeys.list(),
    queryFn: genreApi.fetchGenres,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
