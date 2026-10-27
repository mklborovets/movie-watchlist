import {Movie, useTrendingMoviesQuery} from '@/entities/movie';

export interface UseTrendingMoviesCarouselProps {
  onMoviePress?: (movie: Movie) => void;
}

export const useTrendingMoviesCarousel = ({
  onMoviePress,
}: UseTrendingMoviesCarouselProps = {}) => {
  const {data, isLoading, isError, refetch} = useTrendingMoviesQuery({
    timeWindow: 'day',
  });

  const handleMoviePress = (movie: Movie) => {
    if (onMoviePress) {
      onMoviePress(movie);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    movies: data || [],
    isLoading,
    isError,
    handleMoviePress,
    handleRetry,
  };
};
