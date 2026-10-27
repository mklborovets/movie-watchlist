import {ENV, TMDB_IMAGE_SIZES} from '@/shared';
import {MovieDto, MovieDetailsDto, Movie, MovieDetails} from '../model/types';

export const buildPosterUrl = (
  path: string | null,
  size: keyof typeof TMDB_IMAGE_SIZES.poster = 'large',
): string | null => {
  if (!path) {
    return null;
  }
  const sizeValue = TMDB_IMAGE_SIZES.poster[size];
  return `${ENV.tmdbImageBaseUrl}/${sizeValue}${path}`;
};

export const buildBackdropUrl = (
  path: string | null,
  size: keyof typeof TMDB_IMAGE_SIZES.backdrop = 'large',
): string | null => {
  if (!path) {
    return null;
  }
  const sizeValue = TMDB_IMAGE_SIZES.backdrop[size];
  return `${ENV.tmdbImageBaseUrl}/${sizeValue}${path}`;
};

export const extractReleaseYear = (releaseDate?: string): string => {
  if (!releaseDate) {
    return 'N/A';
  }
  const year = releaseDate.split('-')[0];
  return year || 'N/A';
};

export const formatRuntime = (runtimeMinutes: number | null): string => {
  if (!runtimeMinutes || runtimeMinutes <= 0) {
    return 'N/A';
  }
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${minutes}m`;
};

export const mapMovieDtoToMovie = (dto: MovieDto): Movie => ({
  id: dto.id,
  title: dto.title,
  overview: dto.overview || '',
  posterUrl: buildPosterUrl(dto.poster_path, 'large'),
  backdropUrl: buildBackdropUrl(dto.backdrop_path, 'large'),
  releaseDate: dto.release_date || '',
  releaseYear: extractReleaseYear(dto.release_date),
  rating: Number(dto.vote_average.toFixed(1)),
  voteCount: dto.vote_count,
  genreIds: dto.genre_ids || [],
});

export const mapMovieDetailsDtoToMovieDetails = (
  dto: MovieDetailsDto,
): MovieDetails => ({
  ...mapMovieDtoToMovie(dto),
  runtimeMinutes: dto.runtime,
  runtimeFormatted: formatRuntime(dto.runtime),
  status: dto.status || '',
  tagline: dto.tagline || null,
  genres: dto.genres || [],
});
