import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AlertTriangle, RefreshCw} from 'lucide-react-native';

export interface ErrorStateViewProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorStateView: React.FC<ErrorStateViewProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load content. Please verify your connection and try again.',
  retryLabel = 'Try Again',
  onRetry,
  className = '',
}) => {
  return (
    <View
      className={`flex-1 items-center justify-center px-6 py-12 ${className}`}>
      <View className="w-20 h-20 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border items-center justify-center mb-4">
        <AlertTriangle size={44} color="#E50914" />
      </View>
      <Text className="text-light-text dark:text-dark-text text-xl font-bold text-center mb-2">
        {title}
      </Text>
      <Text className="text-light-muted dark:text-dark-muted text-sm text-center max-w-xs leading-5 mb-6">
        {message}
      </Text>
      {onRetry ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onRetry}
          className="flex-row items-center bg-brand-primary px-6 py-3 rounded-full space-x-2">
          <RefreshCw size={16} color="#FFFFFF" />
          <Text className="text-white font-semibold text-sm ml-2">
            {retryLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
