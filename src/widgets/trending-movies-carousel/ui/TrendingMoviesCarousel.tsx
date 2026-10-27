import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Flame} from 'lucide-react-native';
import {Movie, MovieCard, MovieCardSkeleton} from '@/entities/movie';
import {ErrorStateView} from '@/shared';
import {
  useTrendingMoviesCarousel,
  UseTrendingMoviesCarouselProps,
} from '../model/useTrendingMoviesCarousel';

export interface TrendingMoviesCarouselProps
  extends UseTrendingMoviesCarouselProps {
  className?: string;
}

const styles = StyleSheet.create({
  listContent: {
    paddingLeft: 16,
    paddingRight: 4,
  },
});

export const TrendingMoviesCarousel: React.FC<TrendingMoviesCarouselProps> = ({
  onMoviePress,
  className = '',
}) => {
  const {movies, isLoading, isError, handleMoviePress, handleRetry} =
    useTrendingMoviesCarousel({onMoviePress});

  const renderItem = ({item}: {item: Movie}) => (
    <MovieCard movie={item} onPress={handleMoviePress} />
  );

  return (
    <View className={`my-4 ${className}`}>
      <View className="flex-row items-center px-4 mb-3">
        <Flame size={20} color="#E50914" />
        <Text className="text-dark-text text-lg font-bold ml-1.5">
          Trending Today
        </Text>
      </View>

      {isLoading ? (
        <View className="pl-4">
          <MovieCardSkeleton variant="vertical" count={4} />
        </View>
      ) : isError ? (
        <ErrorStateView
          title="Could not load trending movies"
          message="Check your internet connection or try again."
          onRetry={handleRetry}
          className="py-6"
        />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
