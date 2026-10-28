import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {Bookmark} from 'lucide-react-native';
import {
  useToggleWatchlist,
  UseToggleWatchlistProps,
} from '../model/useToggleWatchlist';

export interface WatchlistButtonProps extends UseToggleWatchlistProps {}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  movie,
  variant = 'icon',
  size = 'md',
  className = '',
  onToggle,
}) => {
  const {
    isInWatchlist,
    isExtended,
    iconSize,
    buttonLabel,
    accessibilityLabel,
    handleToggle,
    animatedStyle,
    containerClassName,
  } = useToggleWatchlist({
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
        <Bookmark
          size={iconSize}
          color={isInWatchlist ? '#E50914' : '#9CA3AF'}
          fill={isInWatchlist ? '#E50914' : 'transparent'}
        />
        {isExtended ? (
          <Text
            className={`text-xs font-semibold ml-2 ${
              isInWatchlist
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
