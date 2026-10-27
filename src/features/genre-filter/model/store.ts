import {create} from 'zustand';

export interface GenreFilterState {
  selectedGenreId: number | null;
  setSelectedGenreId: (genreId: number | null) => void;
  clearGenreFilter: () => void;
}

export const useGenreFilterStore = create<GenreFilterState>(set => ({
  selectedGenreId: null,
  setSelectedGenreId: (genreId: number | null) =>
    set({selectedGenreId: genreId}),
  clearGenreFilter: () => set({selectedGenreId: null}),
}));
