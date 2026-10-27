import {Movie} from '@/entities/movie';

export interface UseWatchlistScreenProps {
  onNavigateToDetails?: (movieId: number) => void;
  onNavigateToHome?: () => void;
}

export const useWatchlistScreen = ({
  onNavigateToDetails,
  onNavigateToHome,
}: UseWatchlistScreenProps = {}) => {
  const handleMoviePress = (movie: Movie) => {
    if (onNavigateToDetails) {
      onNavigateToDetails(movie.id);
    }
  };

  const handleExplorePress = () => {
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  return {
    handleMoviePress,
    handleExplorePress,
  };
};
