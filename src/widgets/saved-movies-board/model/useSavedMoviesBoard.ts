import {useState} from 'react';
import {Movie, useSavedMoviesStore} from '@/entities/movie';
import {useSyncQueueStore} from '@/features/offline-sync';
import {SegmentedControlOption, EmptyStateIconName} from '@/shared';

export type SavedTab = 'watchlist' | 'favorites';

export interface UseSavedMoviesBoardProps {
  onMoviePress?: (movie: Movie) => void;
  onExplorePress?: () => void;
}

export const useSavedMoviesBoard = ({
  onMoviePress,
  onExplorePress,
}: UseSavedMoviesBoardProps = {}) => {
  const [activeTab, setActiveTab] = useState<SavedTab>('watchlist');

  const watchlist = useSavedMoviesStore(state => state.watchlist);
  const favorites = useSavedMoviesStore(state => state.favorites);
  const removeFromWatchlist = useSavedMoviesStore(
    state => state.removeFromWatchlist,
  );
  const removeFromFavorites = useSavedMoviesStore(
    state => state.removeFromFavorites,
  );
  const enqueueMutation = useSyncQueueStore(state => state.enqueueMutation);

  const tabOptions: SegmentedControlOption<SavedTab>[] = [
    {
      value: 'watchlist',
      label: 'Watchlist',
      count: watchlist.length,
    },
    {
      value: 'favorites',
      label: 'Favorites',
      count: favorites.length,
    },
  ];

  const isWatchlistTab = activeTab === 'watchlist';
  const currentMovies = isWatchlistTab ? watchlist : favorites;
  const isEmpty = currentMovies.length === 0;

  const emptyTitle = isWatchlistTab
    ? 'Your Watchlist is empty'
    : 'No favorites yet';
  const emptyDescription = isWatchlistTab
    ? 'Explore popular or trending movies and tap the bookmark icon to save them for later.'
    : 'Tap the heart icon on any movie to build your personal collection of favorites.';
  const emptyIconName: EmptyStateIconName = isWatchlistTab
    ? 'bookmark'
    : 'heart';

  const handleTabSelect = (tab: SavedTab) => {
    setActiveTab(tab);
  };

  const handleMoviePress = (movie: Movie) => {
    if (onMoviePress) {
      onMoviePress(movie);
    }
  };

  const handleRemoveMovie = (movieId: number) => {
    if (isWatchlistTab) {
      removeFromWatchlist(movieId);
      enqueueMutation('REMOVE_WATCHLIST', movieId);
    } else {
      removeFromFavorites(movieId);
      enqueueMutation('REMOVE_FAVORITE', movieId);
    }
  };

  const handleExplorePress = () => {
    if (onExplorePress) {
      onExplorePress();
    }
  };

  return {
    activeTab,
    tabOptions,
    currentMovies,
    isEmpty,
    emptyTitle,
    emptyDescription,
    emptyIconName,
    handleTabSelect,
    handleMoviePress,
    handleRemoveMovie,
    handleExplorePress,
  };
};
