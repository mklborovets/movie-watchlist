import React from 'react';
import {ScreenContainer} from '@/shared';
import {OfflineStatusBar} from '@/widgets/offline-status-bar';
import {SearchCatalog} from '@/widgets/search-catalog';
import {useSearchScreen, UseSearchScreenProps} from '../model/useSearchScreen';

export interface SearchScreenProps extends UseSearchScreenProps {}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigateToDetails,
}) => {
  const {handleMoviePress} = useSearchScreen({onNavigateToDetails});

  return (
    <ScreenContainer withPadding={false} scrollable={false}>
      <OfflineStatusBar />
      <SearchCatalog onMoviePress={handleMoviePress} />
    </ScreenContainer>
  );
};
