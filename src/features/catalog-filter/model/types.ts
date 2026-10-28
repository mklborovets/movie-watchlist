import {MovieSortOption} from '@/entities/movie';

export interface SortOptionItem {
  value: MovieSortOption;
  label: string;
}

export interface RatingOptionItem {
  value: number | null;
  label: string;
}

export interface YearOptionItem {
  value: number | null;
  label: string;
}
