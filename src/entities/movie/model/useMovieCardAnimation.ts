import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Movie} from './types';

export interface UseMovieCardAnimationProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
}

export const useMovieCardAnimation = ({
  movie,
  onPress,
}: UseMovieCardAnimationProps) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96, {damping: 15, stiffness: 200});
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 200});
  };

  const handlePress = () => {
    if (onPress) {
      onPress(movie);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return {
    handlePressIn,
    handlePressOut,
    handlePress,
    animatedStyle,
  };
};
