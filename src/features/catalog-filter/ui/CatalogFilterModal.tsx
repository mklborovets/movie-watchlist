import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {X, RotateCcw, Check, Star} from 'lucide-react-native';
import {Genre} from '@/entities/genre';
import {useCatalogFilterModal} from '../model/useCatalogFilterModal';
import {SortOptionItem, RatingOptionItem, YearOptionItem} from '../model/types';

export interface CatalogFilterModalProps {
  className?: string;
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalContent: {
    maxHeight: '85%',
  },
});

export const CatalogFilterModal: React.FC<CatalogFilterModalProps> = () => {
  const {
    genres,
    selectedGenreId,
    sortBy,
    minRating,
    releaseYear,
    isModalOpen,
    activeFilterCount,
    sortOptions,
    ratingOptions,
    yearOptions,
    handleSelectGenre,
    handleSelectSort,
    handleSelectRating,
    handleSelectYear,
    handleReset,
    handleApply,
    closeModal,
  } = useCatalogFilterModal();

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent
      onRequestClose={closeModal}>
      <View className="flex-1 justify-end" style={styles.backdrop}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModal}
          className="flex-1"
          accessibilityRole="button"
          accessibilityLabel="Close filter modal backdrop"
        />

        <View
          style={styles.modalContent}
          className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border rounded-t-3xl pt-3 pb-8 px-4">
          <View className="w-10 h-1 bg-light-border dark:bg-dark-border rounded-full self-center mb-3" />

          <View className="flex-row items-center justify-between pb-3 border-b border-light-border/60 dark:border-dark-border/60">
            <View className="flex-row items-center">
              <Text className="text-light-text dark:text-dark-text text-lg font-bold">
                Filters & Sorting
              </Text>
              {activeFilterCount > 0 ? (
                <View className="ml-2 px-2 py-0.5 rounded-full bg-brand-primary">
                  <Text className="text-white text-xs font-bold">
                    {activeFilterCount}
                  </Text>
                </View>
              ) : null}
            </View>

            <View className="flex-row items-center space-x-2">
              {activeFilterCount > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleReset}
                  className="flex-row items-center px-2.5 py-1 rounded-lg bg-light-border dark:bg-dark-border mr-2"
                  accessibilityRole="button"
                  accessibilityLabel="Reset all filters">
                  <RotateCcw size={12} color="#9CA3AF" />
                  <Text className="text-light-muted dark:text-dark-muted text-xs font-medium ml-1">
                    Reset
                  </Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={closeModal}
                className="w-8 h-8 rounded-full bg-light-border dark:bg-dark-border items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Close filter modal">
                <X size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mt-3 flex-grow-0">
            <View className="mb-5">
              <Text className="text-light-text dark:text-dark-text font-bold text-sm mb-2.5">
                Sort By
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {sortOptions.map((option: SortOptionItem) => {
                  const isSelected = sortBy === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      activeOpacity={0.75}
                      onPress={() => handleSelectSort(option.value)}
                      className={`px-3 py-2 rounded-xl border flex-row items-center ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary'
                          : 'bg-light-background dark:bg-dark-card border-light-border dark:border-dark-border'
                      }`}>
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected
                            ? 'text-white'
                            : 'text-light-text dark:text-dark-text'
                        }`}>
                        {option.label}
                      </Text>
                      {isSelected ? (
                        <Check size={12} color="#FFFFFF" className="ml-1.5" />
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-light-text dark:text-dark-text font-bold text-sm mb-2.5">
                Genres
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => handleSelectGenre(null)}
                  className={`px-3 py-1.5 rounded-full border ${
                    selectedGenreId === null
                      ? 'bg-brand-primary border-brand-primary'
                      : 'bg-light-background dark:bg-dark-card border-light-border dark:border-dark-border'
                  }`}>
                  <Text
                    className={`text-xs font-semibold ${
                      selectedGenreId === null
                        ? 'text-white'
                        : 'text-light-muted dark:text-dark-muted'
                    }`}>
                    All Genres
                  </Text>
                </TouchableOpacity>

                {genres.map((genre: Genre) => {
                  const isSelected = selectedGenreId === genre.id;
                  return (
                    <TouchableOpacity
                      key={genre.id}
                      activeOpacity={0.75}
                      onPress={() => handleSelectGenre(genre.id)}
                      className={`px-3 py-1.5 rounded-full border ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary'
                          : 'bg-light-background dark:bg-dark-card border-light-border dark:border-dark-border'
                      }`}>
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected
                            ? 'text-white'
                            : 'text-light-muted dark:text-dark-muted'
                        }`}>
                        {genre.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-light-text dark:text-dark-text font-bold text-sm mb-2.5">
                Minimum Rating
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {ratingOptions.map((option: RatingOptionItem) => {
                  const isSelected = minRating === option.value;
                  return (
                    <TouchableOpacity
                      key={option.label}
                      activeOpacity={0.75}
                      onPress={() => handleSelectRating(option.value)}
                      className={`px-3 py-1.5 rounded-xl border flex-row items-center ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary'
                          : 'bg-light-background dark:bg-dark-card border-light-border dark:border-dark-border'
                      }`}>
                      {option.value !== null ? (
                        <Star
                          size={11}
                          color={isSelected ? '#FFFFFF' : '#F5C518'}
                          fill={isSelected ? '#FFFFFF' : '#F5C518'}
                          className="mr-1"
                        />
                      ) : null}
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected
                            ? 'text-white'
                            : 'text-light-text dark:text-dark-text'
                        }`}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-light-text dark:text-dark-text font-bold text-sm mb-2.5">
                Release Year
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {yearOptions.map((option: YearOptionItem) => {
                  const isSelected = releaseYear === option.value;
                  return (
                    <TouchableOpacity
                      key={option.label}
                      activeOpacity={0.75}
                      onPress={() => handleSelectYear(option.value)}
                      className={`px-3 py-1.5 rounded-xl border ${
                        isSelected
                          ? 'bg-brand-primary border-brand-primary'
                          : 'bg-light-background dark:bg-dark-card border-light-border dark:border-dark-border'
                      }`}>
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected
                            ? 'text-white'
                            : 'text-light-text dark:text-dark-text'
                        }`}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleApply}
            className="w-full bg-brand-primary py-3.5 rounded-xl items-center justify-center mt-2 shadow-lg"
            accessibilityRole="button"
            accessibilityLabel="Apply movie filters">
            <Text className="text-white text-sm font-bold tracking-wide">
              Show Movies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
