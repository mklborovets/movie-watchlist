import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Star, Film} from 'lucide-react-native';
import {Movie} from '../model/types';
import {useMovieCardAnimation} from '../model/useMovieCardAnimation';

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  className?: string;
  width?: number;
}

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
});

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  className = '',
  width = 140,
}) => {
  const {handlePressIn, handlePressOut, handlePress, animatedStyle} =
    useMovieCardAnimation({movie, onPress});

  return (
    <Animated.View
      style={[{width}, animatedStyle]}
      className={`mr-3 ${className}`}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={movie.title}>
        <View className="relative rounded-xl overflow-hidden bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
          {movie.posterUrl ? (
            <Animated.Image
              entering={FadeIn.duration(300)}
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
          <View className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded-md flex-row items-center border border-white/10">
            <Star size={11} color="#F5C518" fill="#F5C518" />
            <Text className="text-white text-xs font-bold ml-1">
              {movie.rating}
            </Text>
          </View>
        </View>
        <View className="mt-2">
          <Text
            numberOfLines={1}
            className="text-light-text dark:text-dark-text font-semibold text-sm">
            {movie.title}
          </Text>
          <Text className="text-light-muted dark:text-dark-muted text-xs mt-0.5">
            {movie.releaseYear}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
