import {Genre} from './types';

export interface UseGenreBadgeProps {
  genre: Genre;
  selected?: boolean;
  onPress?: (genre: Genre) => void;
}

export const useGenreBadge = ({
  genre,
  selected = false,
  onPress,
}: UseGenreBadgeProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress(genre);
    }
  };

  return {
    label: genre.name,
    isSelected: selected,
    isPressable: Boolean(onPress),
    handlePress,
  };
};
