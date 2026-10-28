import {httpClient, ENV} from '@/shared';
import {
  MovieDto,
  MovieDetailsDto,
  MovieApiResponseDto,
  TrendingQueryParams,
  SearchMoviesQueryParams,
  DiscoverMoviesQueryParams,
} from '../model/types';

export const movieApi = {
  async fetchTrendingMovies({
    timeWindow = 'day',
  }: TrendingQueryParams = {}): Promise<MovieApiResponseDto<MovieDto>> {
    const response = await httpClient.get<MovieApiResponseDto<MovieDto>>(
      `/trending/movie/${timeWindow}`,
    );
    return response.data;
  },

  async fetchPopularMovies(
    page: number = 1,
  ): Promise<MovieApiResponseDto<MovieDto>> {
    const response = await httpClient.get<MovieApiResponseDto<MovieDto>>(
      '/movie/popular',
      {
        params: {page},
      },
    );
    return response.data;
  },

  async searchMovies({
    query,
    page = 1,
  }: SearchMoviesQueryParams): Promise<MovieApiResponseDto<MovieDto>> {
    const response = await httpClient.get<MovieApiResponseDto<MovieDto>>(
      '/search/movie',
      {
        params: {
          query,
          page,
          include_adult: false,
        },
      },
    );
    return response.data;
  },

  async discoverMovies({
    genreId,
    page = 1,
    sortBy = 'popularity.desc',
  }: DiscoverMoviesQueryParams = {}): Promise<MovieApiResponseDto<MovieDto>> {
    const response = await httpClient.get<MovieApiResponseDto<MovieDto>>(
      '/discover/movie',
      {
        params: {
          with_genres: genreId,
          page,
          sort_by: sortBy,
          include_adult: false,
        },
      },
    );
    return response.data;
  },

  async fetchMovieDetails(movieId: number): Promise<MovieDetailsDto> {
    const response = await httpClient.get<MovieDetailsDto>(`/movie/${movieId}`);
    return response.data;
  },

  async fetchAccountWatchlist(
    page: number = 1,
  ): Promise<MovieApiResponseDto<MovieDto>> {
    const accountId = ENV.tmdbAccountId;
    const response = await httpClient.get<MovieApiResponseDto<MovieDto>>(
      `/account/${accountId}/watchlist/movies`,
      {
        params: {
          page,
          sort_by: 'created_at.desc',
        },
      },
    );
    return response.data;
  },

  async fetchAccountFavorites(
    page: number = 1,
  ): Promise<MovieApiResponseDto<MovieDto>> {
    const accountId = ENV.tmdbAccountId;
    const response = await httpClient.get<MovieApiResponseDto<MovieDto>>(
      `/account/${accountId}/favorite/movies`,
      {
        params: {
          page,
          sort_by: 'created_at.desc',
        },
      },
    );
    return response.data;
  },
};
