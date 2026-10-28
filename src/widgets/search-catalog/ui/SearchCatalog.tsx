import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Movie, MovieHorizontalCard, MovieCardSkeleton} from '@/entities/movie';
import {SearchInputBar} from '@/features/search-query';
import {GenreFilterList} from '@/features/genre-filter';
import {
  CatalogFilterButton,
  CatalogFilterModal,
} from '@/features/catalog-filter';
import {WatchlistButton} from '@/features/toggle-watchlist';
import {EmptyStateView, ErrorStateView} from '@/shared';
import {
  useSearchCatalog,
  UseSearchCatalogProps,
} from '../model/useSearchCatalog';

export interface SearchCatalogProps extends UseSearchCatalogProps {
  className?: string;
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export const SearchCatalog: React.FC<SearchCatalogProps> = ({
  onMoviePress,
  className = '',
}) => {
  const {
    movies,
    isLoading,
    isError,
    isEmpty,
    emptyTitle,
    emptyDescription,
    isFetchingNextPage,
    handleEndReached,
    handleMoviePress,
    handleRetry,
  } = useSearchCatalog({onMoviePress});

  const renderItem = ({item}: {item: Movie}) => (
    <MovieHorizontalCard
      movie={item}
      onPress={handleMoviePress}
      actionSlot={<WatchlistButton movie={item} size="sm" />}
    />
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View className="py-2">
          <MovieCardSkeleton variant="horizontal" count={2} />
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="px-4 pt-3">
          <MovieCardSkeleton variant="horizontal" count={4} />
        </View>
      );
    }

    if (isError) {
      return (
        <ErrorStateView
          title="Search Failed"
          message="Could not load movies from TMDB. Please try again."
          onRetry={handleRetry}
        />
      );
    }

    if (isEmpty) {
      return (
        <EmptyStateView
          iconName="search"
          title={emptyTitle}
          description={emptyDescription}
        />
      );
    }

    return (
      <FlatList
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View className={`flex-1 ${className}`}>
      <View className="px-4 pt-3 pb-2 flex-row items-center">
        <View className="flex-1 mr-2">
          <SearchInputBar />
        </View>
        <CatalogFilterButton />
      </View>
      <GenreFilterList className="pb-1" />
      <View className="flex-1">{renderContent()}</View>
      <CatalogFilterModal />
    </View>
  );
};
