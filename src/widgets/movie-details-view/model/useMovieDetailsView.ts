import {MovieDetails, useMovieDetailsQuery} from '@/entities/movie';

export interface UseMovieDetailsViewProps {
  movieId: number;
  onBackPress?: () => void;
}

export const useMovieDetailsView = ({
  movieId,
  onBackPress,
}: UseMovieDetailsViewProps) => {
  const {data, isLoading, isError, refetch} = useMovieDetailsQuery(movieId);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    movie: data as MovieDetails | undefined,
    isLoading,
    isError,
    handleBackPress,
    handleRetry,
  };
};
