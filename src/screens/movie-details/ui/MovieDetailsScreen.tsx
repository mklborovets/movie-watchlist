import React from 'react';
import {ScreenContainer} from '@/shared';
import {OfflineStatusBar} from '@/widgets/offline-status-bar';
import {MovieDetailsView} from '@/widgets/movie-details-view';
import {
  useMovieDetailsScreen,
  UseMovieDetailsScreenProps,
} from '../model/useMovieDetailsScreen';

export interface MovieDetailsScreenProps extends UseMovieDetailsScreenProps {}

export const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({
  movieId,
  onGoBack,
}) => {
  const {handleBackPress} = useMovieDetailsScreen({movieId, onGoBack});

  return (
    <ScreenContainer withPadding={false} scrollable={false}>
      <OfflineStatusBar />
      <MovieDetailsView movieId={movieId} onBackPress={handleBackPress} />
    </ScreenContainer>
  );
};
