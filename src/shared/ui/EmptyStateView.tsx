import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useEmptyStateView, EmptyStateIconName} from './model/useEmptyStateView';

export interface EmptyStateViewProps {
  title: string;
  description: string;
  iconName?: EmptyStateIconName;
  actionLabel?: string;
  onActionPress?: () => void;
  className?: string;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  title,
  description,
  iconName = 'inbox',
  actionLabel,
  onActionPress,
  className = '',
}) => {
  const {icon, hasAction, handleActionPress} = useEmptyStateView({
    iconName,
    onActionPress,
  });

  return (
    <View
      className={`flex-1 items-center justify-center px-6 py-12 ${className}`}>
      <View className="w-20 h-20 rounded-full bg-dark-card border border-dark-border items-center justify-center mb-4">
        {icon}
      </View>
      <Text className="text-dark-text text-xl font-bold text-center mb-2">
        {title}
      </Text>
      <Text className="text-dark-muted text-sm text-center max-w-xs leading-5 mb-6">
        {description}
      </Text>
      {hasAction && actionLabel ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleActionPress}
          className="bg-brand-primary px-6 py-3 rounded-full">
          <Text className="text-white font-semibold text-sm">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
