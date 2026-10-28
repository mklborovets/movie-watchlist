import {useCallback, useMemo} from 'react';
import {Genre, useGenresQuery} from '@/entities/genre';
import {useGenreFilterStore} from '@/features/genre-filter';
import {MovieSortOption} from '@/entities/movie';
import {useCatalogFilterStore} from './store';
import {SortOptionItem, RatingOptionItem, YearOptionItem} from './types';

export const useCatalogFilterModal = () => {
  const {data: genres = [], isLoading: isLoadingGenres} = useGenresQuery();
  const selectedGenreId = useGenreFilterStore(state => state.selectedGenreId);
  const setSelectedGenreId = useGenreFilterStore(
    state => state.setSelectedGenreId,
  );
  const clearGenreFilter = useGenreFilterStore(state => state.clearGenreFilter);

  const sortBy = useCatalogFilterStore(state => state.sortBy);
  const minRating = useCatalogFilterStore(state => state.minRating);
  const releaseYear = useCatalogFilterStore(state => state.releaseYear);
  const isModalOpen = useCatalogFilterStore(state => state.isModalOpen);
  const setSortBy = useCatalogFilterStore(state => state.setSortBy);
  const setMinRating = useCatalogFilterStore(state => state.setMinRating);
  const setReleaseYear = useCatalogFilterStore(state => state.setReleaseYear);
  const closeModal = useCatalogFilterStore(state => state.closeModal);
  const resetFilters = useCatalogFilterStore(state => state.resetFilters);

  const sortOptions: SortOptionItem[] = useMemo(
    () => [
      {value: 'popularity.desc', label: 'Most Popular'},
      {value: 'vote_average.desc', label: 'Highest Rated'},
      {value: 'primary_release_date.desc', label: 'Newest First'},
      {value: 'primary_release_date.asc', label: 'Oldest / Classic'},
      {value: 'vote_count.desc', label: 'Most Voted'},
    ],
    [],
  );

  const ratingOptions: RatingOptionItem[] = useMemo(
    () => [
      {value: null, label: 'Any'},
      {value: 6, label: '6.0+'},
      {value: 7, label: '7.0+'},
      {value: 8, label: '8.0+'},
      {value: 8.5, label: '8.5+'},
    ],
    [],
  );

  const yearOptions: YearOptionItem[] = useMemo(
    () => [
      {value: null, label: 'Any'},
      {value: 2026, label: '2026'},
      {value: 2025, label: '2025'},
      {value: 2024, label: '2024'},
      {value: 2023, label: '2023'},
      {value: 2022, label: '2022'},
    ],
    [],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenreId !== null) {
      count += 1;
    }
    if (sortBy !== 'popularity.desc') {
      count += 1;
    }
    if (minRating !== null) {
      count += 1;
    }
    if (releaseYear !== null) {
      count += 1;
    }
    return count;
  }, [selectedGenreId, sortBy, minRating, releaseYear]);

  const handleSelectGenre = useCallback(
    (genreId: number | null) => {
      if (selectedGenreId === genreId) {
        clearGenreFilter();
      } else {
        setSelectedGenreId(genreId);
      }
    },
    [selectedGenreId, clearGenreFilter, setSelectedGenreId],
  );

  const handleSelectSort = useCallback(
    (sort: MovieSortOption) => {
      setSortBy(sort);
    },
    [setSortBy],
  );

  const handleSelectRating = useCallback(
    (rating: number | null) => {
      setMinRating(rating);
    },
    [setMinRating],
  );

  const handleSelectYear = useCallback(
    (year: number | null) => {
      setReleaseYear(year);
    },
    [setReleaseYear],
  );

  const handleReset = useCallback(() => {
    resetFilters();
    clearGenreFilter();
  }, [resetFilters, clearGenreFilter]);

  const handleApply = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return {
    genres: genres as Genre[],
    isLoadingGenres,
    selectedGenreId,
    sortBy,
    minRating,
    releaseYear,
    isModalOpen,
    activeFilterCount,
    sortOptions,
    ratingOptions,
    yearOptions,
    handleSelectGenre,
    handleSelectSort,
    handleSelectRating,
    handleSelectYear,
    handleReset,
    handleApply,
    closeModal,
  };
};
