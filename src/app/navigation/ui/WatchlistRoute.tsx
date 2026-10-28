import React from 'react';
import {WatchlistScreen} from '@/screens/watchlist';
import {useWatchlistRoute} from '../model/useWatchlistRoute';

export const WatchlistRoute: React.FC = () => {
  const {handleNavigateToDetails, handleNavigateToHome} = useWatchlistRoute();

  return (
    <WatchlistScreen
      onNavigateToDetails={handleNavigateToDetails}
      onNavigateToHome={handleNavigateToHome}
    />
  );
};
