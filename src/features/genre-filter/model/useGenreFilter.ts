import {Genre, useGenresQuery} from '@/entities/genre';
import {useGenreFilterStore} from './store';

export const useGenreFilter = () => {
  const {data, isLoading} = useGenresQuery();
  const selectedGenreId = useGenreFilterStore(state => state.selectedGenreId);
  const setSelectedGenreId = useGenreFilterStore(
    state => state.setSelectedGenreId,
  );

  const handleGenrePress = (genre: Genre) => {
    if (selectedGenreId === genre.id) {
      setSelectedGenreId(null);
    } else {
      setSelectedGenreId(genre.id);
    }
  };

  const handleAllPress = () => {
    setSelectedGenreId(null);
  };

  return {
    genres: data || [],
    selectedGenreId,
    isAllSelected: selectedGenreId === null,
    isLoading,
    handleGenrePress,
    handleAllPress,
  };
};
