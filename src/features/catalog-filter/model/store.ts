import {create} from 'zustand';
import {MovieSortOption} from '@/entities/movie';

export interface CatalogFilterState {
  sortBy: MovieSortOption;
  minRating: number | null;
  releaseYear: number | null;
  isModalOpen: boolean;
  setSortBy: (sortBy: MovieSortOption) => void;
  setMinRating: (rating: number | null) => void;
  setReleaseYear: (year: number | null) => void;
  openModal: () => void;
  closeModal: () => void;
  resetFilters: () => void;
}

export const useCatalogFilterStore = create<CatalogFilterState>(set => ({
  sortBy: 'popularity.desc',
  minRating: null,
  releaseYear: null,
  isModalOpen: false,
  setSortBy: (sortBy: MovieSortOption) => set({sortBy}),
  setMinRating: (minRating: number | null) => set({minRating}),
  setReleaseYear: (releaseYear: number | null) => set({releaseYear}),
  openModal: () => set({isModalOpen: true}),
  closeModal: () => set({isModalOpen: false}),
  resetFilters: () =>
    set({
      sortBy: 'popularity.desc',
      minRating: null,
      releaseYear: null,
    }),
}));
