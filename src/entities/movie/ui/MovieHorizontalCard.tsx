import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Star, Film} from 'lucide-react-native';
import {Movie} from '../model/types';
import {useMovieCardAnimation} from '../model/useMovieCardAnimation';

export interface MovieHorizontalCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  actionSlot?: React.ReactNode;
  className?: string;
}

const styles = StyleSheet.create({
  poster: {
    width: 88,
    height: 128,
    borderRadius: 10,
  },
});

export const MovieHorizontalCard: React.FC<MovieHorizontalCardProps> = ({
  movie,
  onPress,
  actionSlot,
  className = '',
}) => {
  const {handlePressIn, handlePressOut, handlePress, animatedStyle} =
    useMovieCardAnimation({movie, onPress});

  return (
    <Animated.View style={animatedStyle} className={`mb-3 ${className}`}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={movie.title}
        className="flex-row bg-dark-card border border-dark-border rounded-xl p-2.5 items-center">
        <View className="overflow-hidden rounded-lg bg-dark-border mr-3">
          {movie.posterUrl ? (
            <Animated.Image
              entering={FadeIn.duration(250)}
              source={{uri: movie.posterUrl}}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View
              style={styles.poster}
              className="items-center justify-center bg-dark-card">
              <Film size={28} color="#6B7280" />
            </View>
          )}
        </View>

        <View className="flex-1 justify-between py-1">
          <View>
            <Text
              numberOfLines={1}
              className="text-dark-text font-bold text-base leading-5">
              {movie.title}
            </Text>
            <View className="flex-row items-center mt-1.5 space-x-2">
              <View className="flex-row items-center bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
                <Star size={11} color="#F5C518" fill="#F5C518" />
                <Text className="text-white text-xs font-bold ml-1">
                  {movie.rating}
                </Text>
              </View>
              <Text className="text-dark-muted text-xs ml-2">
                {movie.releaseYear}
              </Text>
            </View>
          </View>

          <Text
            numberOfLines={2}
            className="text-dark-muted text-xs leading-4 mt-2">
            {movie.overview || 'No description available.'}
          </Text>
        </View>

        {actionSlot ? <View className="ml-2">{actionSlot}</View> : null}
      </TouchableOpacity>
    </Animated.View>
  );
};
