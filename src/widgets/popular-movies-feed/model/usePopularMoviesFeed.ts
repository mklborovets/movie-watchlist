import {useState, useCallback} from 'react';
import {Movie, usePopularMoviesInfiniteQuery} from '@/entities/movie';

export interface UsePopularMoviesFeedProps {
  onMoviePress?: (movie: Movie) => void;
}

export const usePopularMoviesFeed = ({
  onMoviePress,
}: UsePopularMoviesFeedProps = {}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = usePopularMoviesInfiniteQuery();

  const movies: Movie[] = data ? data.pages.flatMap(page => page.movies) : [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handleMoviePress = (movie: Movie) => {
    if (onMoviePress) {
      onMoviePress(movie);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    movies,
    isLoading,
    isError,
    isRefreshing,
    isFetchingNextPage,
    handleRefresh,
    handleEndReached,
    handleMoviePress,
    handleRetry,
  };
};
