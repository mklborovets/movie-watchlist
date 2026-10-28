import React from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Sparkles} from 'lucide-react-native';
import {Movie, MovieHorizontalCard, MovieCardSkeleton} from '@/entities/movie';
import {WatchlistButton} from '@/features/toggle-watchlist';
import {ErrorStateView} from '@/shared';
import {
  usePopularMoviesFeed,
  UsePopularMoviesFeedProps,
} from '../model/usePopularMoviesFeed';

export interface PopularMoviesFeedProps extends UsePopularMoviesFeedProps {
  headerComponent?: React.ReactElement;
  className?: string;
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 32,
  },
});

export const PopularMoviesFeed: React.FC<PopularMoviesFeedProps> = ({
  headerComponent,
  onMoviePress,
  className = '',
}) => {
  const {
    movies,
    isLoading,
    isError,
    isRefreshing,
    isFetchingNextPage,
    handleRefresh,
    handleEndReached,
    handleMoviePress,
    handleRetry,
  } = usePopularMoviesFeed({onMoviePress});

  const renderItem = ({item}: {item: Movie}) => (
    <View className="px-4">
      <MovieHorizontalCard
        movie={item}
        onPress={handleMoviePress}
        actionSlot={<WatchlistButton movie={item} size="sm" />}
      />
    </View>
  );

  const renderHeader = () => (
    <View>
      {headerComponent}
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <Sparkles size={20} color="#F5C518" />
        <Text className="text-light-text dark:text-dark-text text-lg font-bold ml-1.5">
          Popular Movies
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View className="px-4 py-2">
          <MovieCardSkeleton variant="horizontal" count={2} />
        </View>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <View className={`flex-1 ${className}`}>
        {headerComponent}
        <View className="flex-row items-center px-4 pt-2 pb-3">
          <Sparkles size={20} color="#F5C518" />
          <Text className="text-light-text dark:text-dark-text text-lg font-bold ml-1.5">
            Popular Movies
          </Text>
        </View>
        <View className="px-4">
          <MovieCardSkeleton variant="horizontal" count={4} />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View className={`flex-1 ${className}`}>
        {headerComponent}
        <ErrorStateView
          title="Could not load popular movies"
          message="Please verify your internet connection and try again."
          onRetry={handleRetry}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor="#E50914"
          colors={['#E50914']}
        />
      }
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      className={className}
    />
  );
};
