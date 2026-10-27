import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Genre, GenreBadge} from '@/entities/genre';
import {useGenreFilter} from '../model/useGenreFilter';

export interface GenreFilterListProps {
  className?: string;
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export const GenreFilterList: React.FC<GenreFilterListProps> = ({
  className = '',
}) => {
  const {
    genres,
    selectedGenreId,
    isAllSelected,
    isLoading,
    handleGenrePress,
    handleAllPress,
  } = useGenreFilter();

  if (isLoading && genres.length === 0) {
    return null;
  }

  const renderItem = ({item}: {item: Genre}) => (
    <View className="mr-2">
      <GenreBadge
        genre={item}
        selected={selectedGenreId === item.id}
        onPress={handleGenrePress}
      />
    </View>
  );

  const renderHeader = () => (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handleAllPress}
      accessibilityRole="button"
      accessibilityState={{selected: isAllSelected}}
      className={`px-3 py-1.5 rounded-full border mr-2 items-center justify-center ${
        isAllSelected
          ? 'bg-brand-primary border-brand-primary'
          : 'bg-dark-card border-dark-border'
      }`}>
      <Text
        className={`text-xs font-semibold ${
          isAllSelected ? 'text-white' : 'text-dark-muted'
        }`}>
        All
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className={className}>
      <FlatList
        data={genres}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
