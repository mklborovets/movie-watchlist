import React from 'react';
import {View} from 'react-native';
import {ScreenContainer} from '@/shared';
import {OfflineStatusBar} from '@/widgets/offline-status-bar';
import {HomeHeader} from '@/widgets/home-header';
import {TrendingMoviesCarousel} from '@/widgets/trending-movies-carousel';
import {PopularMoviesFeed} from '@/widgets/popular-movies-feed';
import {useHomeScreen, UseHomeScreenProps} from '../model/useHomeScreen';

export interface HomeScreenProps extends UseHomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToDetails,
  onNavigateToSearch,
}) => {
  const {handleMoviePress, handleSearchPress} = useHomeScreen({
    onNavigateToDetails,
    onNavigateToSearch,
  });

  const listHeader = (
    <View>
      <OfflineStatusBar />
      <HomeHeader onSearchPress={handleSearchPress} />
      <TrendingMoviesCarousel onMoviePress={handleMoviePress} />
    </View>
  );

  return (
    <ScreenContainer withPadding={false} scrollable={false}>
      <PopularMoviesFeed
        headerComponent={listHeader}
        onMoviePress={handleMoviePress}
      />
    </ScreenContainer>
  );
};
