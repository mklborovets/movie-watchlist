import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Search, X} from 'lucide-react-native';
import {useSearchInput} from '../model/useSearchInput';

export interface SearchInputBarProps {
  className?: string;
  autoFocus?: boolean;
}

export const SearchInputBar: React.FC<SearchInputBarProps> = ({
  className = '',
  autoFocus = false,
}) => {
  const {query, hasQuery, handleChangeText, handleClear, placeholder} =
    useSearchInput();

  return (
    <View
      className={`flex-row items-center bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl px-3 py-2.5 ${className}`}>
      <Search size={18} color="#9CA3AF" />
      <TextInput
        value={query}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        className="flex-1 ml-2 text-light-text dark:text-dark-text text-sm py-0"
      />
      {hasQuery ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search input"
          className="w-6 h-6 items-center justify-center rounded-full bg-light-border dark:bg-dark-border">
          <X size={12} color="#9CA3AF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
