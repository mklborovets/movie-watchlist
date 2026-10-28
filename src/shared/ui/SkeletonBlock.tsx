import React from 'react';
import {DimensionValue, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSkeletonAnimation} from './model/useSkeletonAnimation';

export interface SkeletonBlockProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  className?: string;
  style?: ViewStyle;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  className = '',
  style,
}) => {
  const {animatedStyle} = useSkeletonAnimation();

  return (
    <Animated.View
      style={[{width, height, borderRadius}, animatedStyle, style]}
      className={`bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border ${className}`}
    />
  );
};
