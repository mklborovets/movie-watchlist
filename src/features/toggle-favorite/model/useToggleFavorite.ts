import {Movie, useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore} from '@/features/offline-sync';
import {useBounceAnimation} from '@/shared';

export interface UseToggleFavoriteProps {
  movie: Movie;
  variant?: 'icon' | 'extended';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

export const useToggleFavorite = ({
  movie,
  variant = 'icon',
  size = 'md',
  className = '',
  onToggle,
}: UseToggleFavoriteProps) => {
  const isFavorite = useSavedMoviesStore(state =>
    state.favorites.some(item => item.id === movie.id),
  );
  const addToFavorites = useSavedMoviesStore(state => state.addToFavorites);
  const removeFromFavorites = useSavedMoviesStore(
    state => state.removeFromFavorites,
  );
  const enqueueMutation = useSyncQueueStore(state => state.enqueueMutation);

  const {triggerBounce, animatedStyle} = useBounceAnimation({peakScale: 1.3});

  const handleToggle = () => {
    triggerBounce();

    if (isFavorite) {
      removeFromFavorites(movie.id);
      enqueueMutation('REMOVE_FAVORITE', movie.id);
      if (onToggle) {
        onToggle(false);
      }
    } else {
      addToFavorites(movie);
      enqueueMutation('ADD_FAVORITE', movie.id);
      if (onToggle) {
        onToggle(true);
      }
    }
  };

  const isExtended = variant === 'extended';
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  const buttonLabel = isFavorite ? 'Favorite' : 'Add Favorite';
  const accessibilityLabel = isFavorite
    ? `Remove ${movie.title} from favorites`
    : `Add ${movie.title} to favorites`;

  const containerClassName = isExtended
    ? `flex-row items-center justify-center px-4 py-2.5 rounded-full border ${
        isFavorite
          ? 'bg-rose-950/40 border-rose-600'
          : 'bg-dark-card border-dark-border'
      } ${className}`
    : `w-10 h-10 rounded-full items-center justify-center border ${
        isFavorite
          ? 'bg-rose-950/40 border-rose-600'
          : 'bg-dark-card border-dark-border'
      } ${className}`;

  return {
    isFavorite,
    isExtended,
    iconSize,
    buttonLabel,
    accessibilityLabel,
    handleToggle,
    animatedStyle,
    containerClassName,
  };
};
