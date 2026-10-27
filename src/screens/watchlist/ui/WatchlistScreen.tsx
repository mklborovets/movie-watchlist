import React from 'react';
import {ScreenContainer} from '@/shared';
import {OfflineStatusBar} from '@/widgets/offline-status-bar';
import {SavedMoviesBoard} from '@/widgets/saved-movies-board';
import {
  useWatchlistScreen,
  UseWatchlistScreenProps,
} from '../model/useWatchlistScreen';

export interface WatchlistScreenProps extends UseWatchlistScreenProps {}

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  onNavigateToDetails,
  onNavigateToHome,
}) => {
  const {handleMoviePress, handleExplorePress} = useWatchlistScreen({
    onNavigateToDetails,
    onNavigateToHome,
  });

  return (
    <ScreenContainer withPadding={false} scrollable={false}>
      <OfflineStatusBar />
      <SavedMoviesBoard
        onMoviePress={handleMoviePress}
        onExplorePress={handleExplorePress}
      />
    </ScreenContainer>
  );
};
