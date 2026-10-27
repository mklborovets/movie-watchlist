export interface GenreDto {
  id: number;
  name: string;
}

export interface GenreListResponseDto {
  genres: GenreDto[];
}

export interface Genre {
  id: number;
  name: string;
}
