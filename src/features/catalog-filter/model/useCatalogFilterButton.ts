import {useMemo} from 'react';
import {useGenreFilterStore} from '@/features/genre-filter';
import {useCatalogFilterStore} from './store';

export const useCatalogFilterButton = () => {
  const selectedGenreId = useGenreFilterStore(state => state.selectedGenreId);
  const sortBy = useCatalogFilterStore(state => state.sortBy);
  const minRating = useCatalogFilterStore(state => state.minRating);
  const releaseYear = useCatalogFilterStore(state => state.releaseYear);
  const openModal = useCatalogFilterStore(state => state.openModal);

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

  return {
    activeFilterCount,
    handlePress: openModal,
  };
};
