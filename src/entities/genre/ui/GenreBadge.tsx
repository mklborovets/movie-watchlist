import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Genre} from '../model/types';
import {useGenreBadge} from '../model/useGenreBadge';

export interface GenreBadgeProps {
  genre: Genre;
  selected?: boolean;
  onPress?: (genre: Genre) => void;
  className?: string;
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({
  genre,
  selected = false,
  onPress,
  className = '',
}) => {
  const {label, isSelected, isPressable, handlePress} = useGenreBadge({
    genre,
    selected,
    onPress,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={!isPressable}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={{selected: isSelected}}
      className={`px-3 py-1.5 rounded-full border items-center justify-center ${
        isSelected
          ? 'bg-brand-primary border-brand-primary'
          : 'bg-dark-card border-dark-border'
      } ${className}`}>
      <Text
        className={`text-xs font-semibold ${
          isSelected ? 'text-white' : 'text-dark-muted'
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
