import {Movie} from '@/entities/movie';

export interface UseSearchScreenProps {
  onNavigateToDetails?: (movieId: number) => void;
}

export const useSearchScreen = ({
  onNavigateToDetails,
}: UseSearchScreenProps = {}) => {
  const handleMoviePress = (movie: Movie) => {
    if (onNavigateToDetails) {
      onNavigateToDetails(movie.id);
    }
  };

  return {
    handleMoviePress,
  };
};
