import {useCallback} from 'react';
import {
  Movie,
  useSearchMoviesInfiniteQuery,
  useDiscoverMoviesInfiniteQuery,
} from '@/entities/movie';
import {useDebounce} from '@/shared';
import {useSearchQueryStore} from '@/features/search-query';
import {useGenreFilterStore} from '@/features/genre-filter';
import {useCatalogFilterStore} from '@/features/catalog-filter';

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
  const sortBy = useCatalogFilterStore(state => state.sortBy);
  const minRating = useCatalogFilterStore(state => state.minRating);
  const releaseYear = useCatalogFilterStore(state => state.releaseYear);

  const searchQuery = useSearchMoviesInfiniteQuery({query: debouncedQuery});
  const discoverQuery = useDiscoverMoviesInfiniteQuery({
    genreId: selectedGenreId || undefined,
    sortBy,
    minRating: minRating || undefined,
    releaseYear: releaseYear || undefined,
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

  const emptyTitle = isSearching
    ? 'No movies found'
    : 'No movies in this category';
  const emptyDescription = isSearching
    ? 'Try searching with different keywords or check spelling.'
    : 'Try selecting different filters or another genre.';

  const handleRetry = () => {
    activeQuery.refetch();
  };

  return {
    movies,
    isSearching,
    isLoading,
    isError,
    isEmpty,
    emptyTitle,
    emptyDescription,
    isFetchingNextPage,
    handleEndReached,
    handleMoviePress,
    handleRetry,
  };
};
