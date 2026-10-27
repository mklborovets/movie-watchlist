import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {Movie, useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore} from '@/features/offline-sync';

export interface UseToggleWatchlistProps {
  movie: Movie;
  variant?: 'icon' | 'extended';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onToggle?: (isInWatchlist: boolean) => void;
}

export const useToggleWatchlist = ({
  movie,
  variant = 'icon',
  size = 'md',
  className = '',
  onToggle,
}: UseToggleWatchlistProps) => {
  const isInWatchlist = useSavedMoviesStore(state =>
    state.watchlist.some(item => item.id === movie.id),
  );
  const addToWatchlist = useSavedMoviesStore(state => state.addToWatchlist);
  const removeFromWatchlist = useSavedMoviesStore(
    state => state.removeFromWatchlist,
  );
  const enqueueMutation = useSyncQueueStore(state => state.enqueueMutation);

  const scale = useSharedValue(1);

  const handleToggle = () => {
    scale.value = withSequence(
      withTiming(1.25, {duration: 120}),
      withSpring(1, {damping: 12, stiffness: 220}),
    );

    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
      enqueueMutation('REMOVE_WATCHLIST', movie.id);
      if (onToggle) {
        onToggle(false);
      }
    } else {
      addToWatchlist(movie);
      enqueueMutation('ADD_WATCHLIST', movie.id);
      if (onToggle) {
        onToggle(true);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const isExtended = variant === 'extended';
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  const buttonLabel = isInWatchlist ? 'In Watchlist' : 'Watchlist';
  const accessibilityLabel = isInWatchlist
    ? `Remove ${movie.title} from watchlist`
    : `Add ${movie.title} to watchlist`;

  const containerClassName = isExtended
    ? `flex-row items-center justify-center px-4 py-2.5 rounded-full border ${
        isInWatchlist
          ? 'bg-brand-primary/20 border-brand-primary'
          : 'bg-dark-card border-dark-border'
      } ${className}`
    : `w-10 h-10 rounded-full items-center justify-center border ${
        isInWatchlist
          ? 'bg-brand-primary/20 border-brand-primary'
          : 'bg-dark-card border-dark-border'
      } ${className}`;

  return {
    isInWatchlist,
    isExtended,
    iconSize,
    buttonLabel,
    accessibilityLabel,
    handleToggle,
    animatedStyle,
    containerClassName,
  };
};
