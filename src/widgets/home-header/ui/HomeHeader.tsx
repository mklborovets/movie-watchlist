import React from 'react';
import {View, Text} from 'react-native';
import {Search} from 'lucide-react-native';
import {IconButton} from '@/shared';
import {ThemeToggleButton} from '@/features/switch-theme';
import {useHomeHeader, UseHomeHeaderProps} from '../model/useHomeHeader';

export interface HomeHeaderProps extends UseHomeHeaderProps {
  className?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onSearchPress,
  className = '',
}) => {
  const {title, hasSearchAction, handleSearchPress} = useHomeHeader({
    onSearchPress,
  });

  return (
    <View
      className={`flex-row items-center justify-between py-3 px-4 bg-dark-background border-b border-dark-border ${className}`}>
      <View className="flex-row items-center">
        <Text className="text-brand-primary text-xl font-black tracking-wider">
          {title}
        </Text>
      </View>

      <View className="flex-row items-center space-x-2">
        {hasSearchAction ? (
          <IconButton
            icon={<Search size={18} color="#9CA3AF" />}
            onPress={handleSearchPress}
            size="md"
            variant="secondary"
            accessibilityLabel="Search movies"
            className="mr-2"
          />
        ) : null}
        <ThemeToggleButton />
      </View>
    </View>
  );
};
