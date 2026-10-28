import React from 'react';
import {HomeScreen} from '@/screens/home';
import {useHomeRoute} from '../model/useHomeRoute';

export const HomeRoute: React.FC = () => {
  const {handleNavigateToDetails, handleNavigateToSearch} = useHomeRoute();

  return (
    <HomeScreen
      onNavigateToDetails={handleNavigateToDetails}
      onNavigateToSearch={handleNavigateToSearch}
    />
  );
};
