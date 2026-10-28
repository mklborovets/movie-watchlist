import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {Heart} from 'lucide-react-native';
import {
  useToggleFavorite,
  UseToggleFavoriteProps,
} from '../model/useToggleFavorite';

export interface FavoriteButtonProps extends UseToggleFavoriteProps {}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movie,
  variant = 'icon',
  size = 'md',
  className = '',
  onToggle,
}) => {
  const {
    isFavorite,
    isExtended,
    iconSize,
    buttonLabel,
    accessibilityLabel,
    handleToggle,
    animatedStyle,
    containerClassName,
  } = useToggleFavorite({
    movie,
    variant,
    size,
    className,
    onToggle,
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={handleToggle}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        className={containerClassName}>
        <Heart
          size={iconSize}
          color={isFavorite ? '#E50914' : '#9CA3AF'}
          fill={isFavorite ? '#E50914' : 'transparent'}
        />
        {isExtended ? (
          <Text
            className={`text-xs font-semibold ml-2 ${
              isFavorite
                ? 'text-brand-primary'
                : 'text-light-text dark:text-dark-text'
            }`}>
            {buttonLabel}
          </Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};
