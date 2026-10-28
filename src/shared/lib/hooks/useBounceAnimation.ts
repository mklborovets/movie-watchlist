import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export interface UseBounceAnimationOptions {
  peakScale?: number;
  duration?: number;
  damping?: number;
  stiffness?: number;
}

export const useBounceAnimation = ({
  peakScale = 1.25,
  duration = 120,
  damping = 12,
  stiffness = 220,
}: UseBounceAnimationOptions = {}) => {
  const scale = useSharedValue(1);

  const triggerBounce = () => {
    scale.value = withSequence(
      withTiming(peakScale, {duration}),
      withSpring(1, {damping, stiffness}),
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return {
    triggerBounce,
    animatedStyle,
  };
};
