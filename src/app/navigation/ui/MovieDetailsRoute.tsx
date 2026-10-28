import React from 'react';
import {MovieDetailsScreen} from '@/screens/movie-details';
import {useMovieDetailsRoute} from '../model/useMovieDetailsRoute';

export const MovieDetailsRoute: React.FC = () => {
  const {movieId, handleGoBack} = useMovieDetailsRoute();

  return <MovieDetailsScreen movieId={movieId} onGoBack={handleGoBack} />;
};
