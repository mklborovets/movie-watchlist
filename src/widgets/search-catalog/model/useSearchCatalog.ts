import {useCallback} from 'react';
import {
  Movie,
  useSearchMoviesInfiniteQuery,
  useDiscoverMoviesInfiniteQuery,
} from '@/entities/movie';
import {useDebounce} from '@/shared';
import {useSearchQueryStore} from '@/features/search-query';
import {useGenreFilterStore} from '@/features/genre-filter';

export interface UseSearchCatalogProps {
  onMoviePress?: (movie: Movie) => void;
}

export const useSearchCatalog = ({
  onMoviePress,
}: UseSearchCatalogProps = {}) => {
  const query = useSearchQueryStore(state => state.query);
  const debouncedQuery = useDebounce(query, 400).trim();
  const isSearching = debouncedQuery.length > 0;

  const selectedGenreId = useGenreFilterStore(state => state.selectedGenreId);

  const searchQuery = useSearchMoviesInfiniteQuery({query: debouncedQuery});
  const discoverQuery = useDiscoverMoviesInfiniteQuery({
    genreId: selectedGenreId || undefined,
  });

  const activeQuery = isSearching ? searchQuery : discoverQuery;

  const rawMovies: Movie[] = activeQuery.data
    ? activeQuery.data.pages.flatMap(page => page.movies)
    : [];
  const movies: Movie[] = Array.from(
    new Map(rawMovies.map(movie => [movie.id, movie])).values(),
  );

  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;
  const isFetchingNextPage = activeQuery.isFetchingNextPage;
  const hasNextPage = activeQuery.hasNextPage;
  const isEmpty = !isLoading && !isError && movies.length === 0;

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      activeQuery.fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, activeQuery]);

  const handleMoviePress = (movie: Movie) => {
    if (onMoviePress) {
      onMoviePress(movie);
    }
  };

  const handleRetry = () => {
    activeQuery.refetch();
  };

  return {
    movies,
    isSearching,
    isLoading,
    isError,
    isEmpty,
    isFetchingNextPage,
    handleEndReached,
    handleMoviePress,
    handleRetry,
  };
};
