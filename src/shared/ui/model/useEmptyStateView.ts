import React from 'react';
import {Film, Search, Bookmark, Heart, Inbox} from 'lucide-react-native';

export type EmptyStateIconName =
  | 'film'
  | 'search'
  | 'bookmark'
  | 'heart'
  | 'inbox';

export interface UseEmptyStateViewProps {
  iconName?: EmptyStateIconName;
  onActionPress?: () => void;
}

export const useEmptyStateView = ({
  iconName = 'inbox',
  onActionPress,
}: UseEmptyStateViewProps) => {
  const getIcon = (): React.ReactNode => {
    const iconProps = {size: 48, color: '#9CA3AF'};
    switch (iconName) {
      case 'film':
        return React.createElement(Film, iconProps);
      case 'search':
        return React.createElement(Search, iconProps);
      case 'bookmark':
        return React.createElement(Bookmark, iconProps);
      case 'heart':
        return React.createElement(Heart, iconProps);
      case 'inbox':
      default:
        return React.createElement(Inbox, iconProps);
    }
  };

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress();
    }
  };

  return {
    icon: getIcon(),
    hasAction: Boolean(onActionPress),
    handleActionPress,
  };
};
