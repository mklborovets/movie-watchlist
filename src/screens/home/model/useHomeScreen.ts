import {Movie} from '@/entities/movie';

export interface UseHomeScreenProps {
  onNavigateToDetails?: (movieId: number) => void;
  onNavigateToSearch?: () => void;
}

export const useHomeScreen = ({
  onNavigateToDetails,
  onNavigateToSearch,
}: UseHomeScreenProps = {}) => {
  const handleMoviePress = (movie: Movie) => {
    if (onNavigateToDetails) {
      onNavigateToDetails(movie.id);
    }
  };

  const handleSearchPress = () => {
    if (onNavigateToSearch) {
      onNavigateToSearch();
    }
  };

  return {
    handleMoviePress,
    handleSearchPress,
  };
};
