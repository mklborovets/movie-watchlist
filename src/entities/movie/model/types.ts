export interface MovieDto {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface MovieDetailsDto extends MovieDto {
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  genres: Array<{id: number; name: string}>;
  production_countries: Array<{iso_3166_1: string; name: string}>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
}

export interface MovieApiResponseDto<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  releaseYear: string;
  rating: number;
  voteCount: number;
  genreIds: number[];
}

export interface MovieDetails extends Movie {
  runtimeMinutes: number | null;
  runtimeFormatted: string;
  status: string;
  tagline: string | null;
  genres: Array<{id: number; name: string}>;
}

export interface TrendingQueryParams {
  timeWindow?: 'day' | 'week';
}

export interface SearchMoviesQueryParams {
  query: string;
  page?: number;
}

export interface DiscoverMoviesQueryParams {
  genreId?: number;
  page?: number;
  sortBy?:
    | 'popularity.desc'
    | 'vote_average.desc'
    | 'primary_release_date.desc';
}
