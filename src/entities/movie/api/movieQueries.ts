import {
  useQuery,
  useInfiniteQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/react-query';
import {movieApi} from './movieApi';
import {
  mapMovieDtoToMovie,
  mapMovieDetailsDtoToMovieDetails,
} from '../lib/mapMovieDto';
import {
  Movie,
  MovieDetails,
  TrendingQueryParams,
  SearchMoviesQueryParams,
  DiscoverMoviesQueryParams,
  MovieApiResponseDto,
  MovieDto,
} from '../model/types';

export const movieQueryKeys = {
  all: ['movies'] as const,
  trending: (timeWindow: string) =>
    [...movieQueryKeys.all, 'trending', timeWindow] as const,
  popular: () => [...movieQueryKeys.all, 'popular'] as const,
  search: (query: string) => [...movieQueryKeys.all, 'search', query] as const,
  discover: (
    genreId?: number,
    sortBy?: string,
    minRating?: number,
    releaseYear?: number,
  ) =>
    [
      ...movieQueryKeys.all,
      'discover',
      genreId,
      sortBy,
      minRating,
      releaseYear,
    ] as const,
  details: (id: number) => [...movieQueryKeys.all, 'details', id] as const,
};

export interface InfiniteMoviePage {
  page: number;
  totalPages: number;
  totalResults: number;
  movies: Movie[];
}

const mapPageResponse = (
  response: MovieApiResponseDto<MovieDto>,
): InfiniteMoviePage => ({
  page: response.page,
  totalPages: response.total_pages,
  totalResults: response.total_results,
  movies: response.results.map(mapMovieDtoToMovie),
});

export const useTrendingMoviesQuery = (
  params: TrendingQueryParams = {},
): UseQueryResult<Movie[], Error> => {
  const timeWindow = params.timeWindow || 'day';
  return useQuery({
    queryKey: movieQueryKeys.trending(timeWindow),
    queryFn: async () => {
      const response = await movieApi.fetchTrendingMovies({timeWindow});
      return response.results.map(mapMovieDtoToMovie);
    },
  });
};

export const usePopularMoviesInfiniteQuery = (): UseInfiniteQueryResult<
  InfiniteData<InfiniteMoviePage>,
  Error
> => {
  return useInfiniteQuery({
    queryKey: movieQueryKeys.popular(),
    queryFn: async ({pageParam = 1}) => {
      const response = await movieApi.fetchPopularMovies(pageParam);
      return mapPageResponse(response);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export const useSearchMoviesInfiniteQuery = (
  params: SearchMoviesQueryParams,
): UseInfiniteQueryResult<InfiniteData<InfiniteMoviePage>, Error> => {
  const trimmedQuery = params.query.trim();
  return useInfiniteQuery({
    queryKey: movieQueryKeys.search(trimmedQuery),
    queryFn: async ({pageParam = 1}) => {
      if (!trimmedQuery) {
        return {page: 1, totalPages: 0, totalResults: 0, movies: []};
      }
      const response = await movieApi.searchMovies({
        query: trimmedQuery,
        page: pageParam,
      });
      return mapPageResponse(response);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: trimmedQuery.length > 0,
  });
};

export const useDiscoverMoviesInfiniteQuery = (
  params: DiscoverMoviesQueryParams = {},
): UseInfiniteQueryResult<InfiniteData<InfiniteMoviePage>, Error> => {
  return useInfiniteQuery({
    queryKey: movieQueryKeys.discover(
      params.genreId,
      params.sortBy,
      params.minRating,
      params.releaseYear,
    ),
    queryFn: async ({pageParam = 1}) => {
      const response = await movieApi.discoverMovies({
        genreId: params.genreId,
        sortBy: params.sortBy,
        minRating: params.minRating,
        releaseYear: params.releaseYear,
        page: pageParam,
      });
      return mapPageResponse(response);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export const useMovieDetailsQuery = (
  movieId: number,
): UseQueryResult<MovieDetails, Error> => {
  return useQuery({
    queryKey: movieQueryKeys.details(movieId),
    queryFn: async () => {
      const response = await movieApi.fetchMovieDetails(movieId);
      return mapMovieDetailsDtoToMovieDetails(response);
    },
    enabled: movieId > 0,
  });
};
