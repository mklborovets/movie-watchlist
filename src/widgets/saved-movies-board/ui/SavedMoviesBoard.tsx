import React from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Trash2} from 'lucide-react-native';
import {Movie, MovieHorizontalCard} from '@/entities/movie';
import {SegmentedControl, IconButton, EmptyStateView} from '@/shared';
import {
  useSavedMoviesBoard,
  UseSavedMoviesBoardProps,
  SavedTab,
} from '../model/useSavedMoviesBoard';

export interface SavedMoviesBoardProps extends UseSavedMoviesBoardProps {
  className?: string;
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyListContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export const SavedMoviesBoard: React.FC<SavedMoviesBoardProps> = ({
  onMoviePress,
  onExplorePress,
  className = '',
}) => {
  const {
    activeTab,
    tabOptions,
    currentMovies,
    isEmpty,
    emptyTitle,
    emptyDescription,
    emptyIconName,
    isRefreshing,
    handleRefresh,
    handleTabSelect,
    handleMoviePress,
    handleRemoveMovie,
    handleExplorePress,
  } = useSavedMoviesBoard({onMoviePress, onExplorePress});

  const renderItem = ({item}: {item: Movie}) => (
    <MovieHorizontalCard
      movie={item}
      onPress={handleMoviePress}
      actionSlot={
        <IconButton
          icon={<Trash2 size={16} color="#EF4444" />}
          onPress={() => handleRemoveMovie(item.id)}
          size="sm"
          variant="danger"
          accessibilityLabel={`Remove ${item.title}`}
        />
      }
    />
  );

  return (
    <View className={`flex-1 ${className}`}>
      <View className="px-4 pt-4 pb-2">
        <Text className="text-dark-text text-2xl font-black tracking-wide mb-3">
          Saved Movies
        </Text>
        <SegmentedControl<SavedTab>
          options={tabOptions}
          selectedValue={activeTab}
          onSelect={handleTabSelect}
        />
      </View>

      <View className="flex-1 mt-2">
        <FlatList
          data={currentMovies}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={
            <EmptyStateView
              iconName={emptyIconName}
              title={emptyTitle}
              description={emptyDescription}
              actionLabel="Discover Movies"
              onActionPress={handleExplorePress}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#E50914"
              colors={['#E50914']}
            />
          }
          contentContainerStyle={
            isEmpty ? styles.emptyListContent : styles.listContent
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
