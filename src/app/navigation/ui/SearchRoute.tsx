import React from 'react';
import {SearchScreen} from '@/screens/search';
import {useSearchRoute} from '../model/useSearchRoute';

export const SearchRoute: React.FC = () => {
  const {handleNavigateToDetails} = useSearchRoute();

  return <SearchScreen onNavigateToDetails={handleNavigateToDetails} />;
};
