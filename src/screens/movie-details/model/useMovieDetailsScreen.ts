export interface UseMovieDetailsScreenProps {
  movieId: number;
  onGoBack?: () => void;
}

export const useMovieDetailsScreen = ({
  movieId,
  onGoBack,
}: UseMovieDetailsScreenProps) => {
  const handleBackPress = () => {
    if (onGoBack) {
      onGoBack();
    }
  };

  return {
    movieId,
    handleBackPress,
  };
};
