import {Movie, useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore} from '@/features/offline-sync';
import {useBounceAnimation} from '@/shared';

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

  const {triggerBounce, animatedStyle} = useBounceAnimation({peakScale: 1.25});

  const handleToggle = () => {
    triggerBounce();

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
          : 'bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border'
      } ${className}`
    : `w-10 h-10 rounded-full items-center justify-center border ${
        isInWatchlist
          ? 'bg-brand-primary/20 border-brand-primary'
          : 'bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border'
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
