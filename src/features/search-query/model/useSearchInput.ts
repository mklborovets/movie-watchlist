import {useSearchQueryStore} from './store';

export const useSearchInput = () => {
  const query = useSearchQueryStore(state => state.query);
  const setQuery = useSearchQueryStore(state => state.setQuery);
  const clearQuery = useSearchQueryStore(state => state.clearQuery);

  const hasQuery = query.trim().length > 0;

  const handleChangeText = (text: string) => {
    setQuery(text);
  };

  const handleClear = () => {
    clearQuery();
  };

  return {
    query,
    hasQuery,
    handleChangeText,
    handleClear,
    placeholder: 'Search movies by title...',
  };
};
