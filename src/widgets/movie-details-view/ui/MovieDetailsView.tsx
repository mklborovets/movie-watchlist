import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Star, Calendar, Clock, ChevronLeft, Film} from 'lucide-react-native';
import {GenreBadge} from '@/entities/genre';
import {WatchlistButton} from '@/features/toggle-watchlist';
import {FavoriteButton} from '@/features/toggle-favorite';
import {IconButton, SkeletonBlock, ErrorStateView} from '@/shared';
import {
  useMovieDetailsView,
  UseMovieDetailsViewProps,
} from '../model/useMovieDetailsView';

export interface MovieDetailsViewProps extends UseMovieDetailsViewProps {
  className?: string;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  backdrop: {
    width: '100%',
    height: 220,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
  },
});

export const MovieDetailsView: React.FC<MovieDetailsViewProps> = ({
  movieId,
  onBackPress,
  className = '',
}) => {
  const {movie, isLoading, isError, handleBackPress, handleRetry} =
    useMovieDetailsView({movieId, onBackPress});

  if (isLoading) {
    return (
      <View className={`flex-1 ${className}`}>
        <SkeletonBlock height={220} borderRadius={0} />
        <View className="px-4 -mt-16 flex-row">
          <SkeletonBlock style={styles.poster} />
          <View className="flex-1 ml-4 justify-end pb-2">
            <SkeletonBlock height={24} width="85%" borderRadius={6} />
            <View className="mt-2">
              <SkeletonBlock height={14} width="50%" borderRadius={4} />
            </View>
          </View>
        </View>
        <View className="px-4 mt-6">
          <SkeletonBlock height={16} width="60%" borderRadius={4} />
          <View className="mt-3">
            <SkeletonBlock height={14} width="100%" borderRadius={4} />
            <View className="mt-2">
              <SkeletonBlock height={14} width="90%" borderRadius={4} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (isError || !movie) {
    return (
      <View className={`flex-1 ${className}`}>
        <View className="p-4">
          <IconButton
            icon={<ChevronLeft size={22} color="#FFFFFF" />}
            onPress={handleBackPress}
            size="md"
            variant="glass"
            accessibilityLabel="Go back"
          />
        </View>
        <ErrorStateView
          title="Could not load movie details"
          message="Please verify your internet connection and try again."
          onRetry={handleRetry}
        />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      className={`flex-1 ${className}`}>
      <View className="relative">
        {movie.backdropUrl ? (
          <Animated.Image
            entering={FadeIn.duration(300)}
            source={{uri: movie.backdropUrl}}
            style={styles.backdrop}
            resizeMode="cover"
          />
        ) : (
          <View
            style={styles.backdrop}
            className="bg-light-card dark:bg-dark-card items-center justify-center">
            <Film size={48} color="#4B5563" />
          </View>
        )}
        <View className="absolute top-4 left-4">
          <IconButton
            icon={<ChevronLeft size={22} color="#FFFFFF" />}
            onPress={handleBackPress}
            size="md"
            variant="glass"
            accessibilityLabel="Go back"
          />
        </View>
      </View>

      <View className="px-4 -mt-16 flex-row">
        <View className="shadow-lg shadow-black/80 rounded-xl overflow-hidden bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
          {movie.posterUrl ? (
            <Animated.Image
              source={{uri: movie.posterUrl}}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View
              style={styles.poster}
              className="items-center justify-center bg-light-card dark:bg-dark-card">
              <Film size={36} color="#6B7280" />
            </View>
          )}
        </View>

        <View className="flex-1 ml-4 justify-end pb-1">
          <Text
            numberOfLines={2}
            className="text-light-text dark:text-dark-text text-xl font-bold leading-6">
            {movie.title}
          </Text>
          {movie.tagline ? (
            <Text
              numberOfLines={2}
              className="text-light-muted dark:text-dark-muted text-xs italic mt-1">
              {movie.tagline}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="flex-row items-center px-4 mt-4 space-x-3">
        <View className="flex-row items-center bg-black/40 px-2 py-1 rounded-md border border-white/10">
          <Star size={13} color="#F5C518" fill="#F5C518" />
          <Text className="text-white text-xs font-bold ml-1">
            {movie.rating}
          </Text>
          <Text className="text-light-muted dark:text-dark-muted text-[10px] ml-1">
            ({movie.voteCount})
          </Text>
        </View>

        <View className="flex-row items-center bg-light-card dark:bg-dark-card px-2 py-1 rounded-md border border-light-border dark:border-dark-border ml-2">
          <Calendar size={13} color="#9CA3AF" />
          <Text className="text-light-muted dark:text-dark-muted text-xs ml-1.5 font-medium">
            {movie.releaseYear}
          </Text>
        </View>

        {movie.runtimeFormatted !== 'N/A' ? (
          <View className="flex-row items-center bg-light-card dark:bg-dark-card px-2 py-1 rounded-md border border-light-border dark:border-dark-border ml-2">
            <Clock size={13} color="#9CA3AF" />
            <Text className="text-light-muted dark:text-dark-muted text-xs ml-1.5 font-medium">
              {movie.runtimeFormatted}
            </Text>
          </View>
        ) : null}
      </View>

      {movie.genres.length > 0 ? (
        <View className="flex-row flex-wrap px-4 mt-3">
          {movie.genres.map(genre => (
            <View key={genre.id} className="mr-2 mb-2">
              <GenreBadge genre={genre} />
            </View>
          ))}
        </View>
      ) : null}

      <View className="flex-row items-center px-4 mt-4 space-x-3">
        <View className="flex-1 mr-2">
          <WatchlistButton movie={movie} variant="extended" />
        </View>
        <View className="flex-1 ml-2">
          <FavoriteButton movie={movie} variant="extended" />
        </View>
      </View>

      <View className="px-4 mt-6">
        <Text className="text-light-text dark:text-dark-text text-base font-bold mb-2">
          Overview
        </Text>
        <Text className="text-light-muted dark:text-dark-muted text-sm leading-6">
          {movie.overview || 'No overview available for this movie.'}
        </Text>
      </View>
    </ScrollView>
  );
};
