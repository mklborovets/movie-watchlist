import {create} from 'zustand';

export interface SearchQueryState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearchQueryStore = create<SearchQueryState>(set => ({
  query: '',
  setQuery: (query: string) => set({query}),
  clearQuery: () => set({query: ''}),
}));
