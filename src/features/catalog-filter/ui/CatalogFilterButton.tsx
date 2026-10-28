import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {SlidersHorizontal} from 'lucide-react-native';
import {useCatalogFilterButton} from '../model/useCatalogFilterButton';

export interface CatalogFilterButtonProps {
  className?: string;
}

export const CatalogFilterButton: React.FC<CatalogFilterButtonProps> = ({
  className = '',
}) => {
  const {activeFilterCount, handlePress} = useCatalogFilterButton();
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Open movie filters, ${activeFilterCount} active`}
      className={`relative h-11 px-3.5 rounded-xl border flex-row items-center justify-center ${
        hasActiveFilters
          ? 'bg-brand-primary/15 border-brand-primary'
          : 'bg-dark-card border-dark-border'
      } ${className}`}>
      <SlidersHorizontal
        size={18}
        color={hasActiveFilters ? '#E50914' : '#9CA3AF'}
      />
      {hasActiveFilters ? (
        <View className="ml-1.5 px-1.5 py-0.5 rounded-full bg-brand-primary items-center justify-center">
          <Text className="text-white text-xs font-bold leading-none">
            {activeFilterCount}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
