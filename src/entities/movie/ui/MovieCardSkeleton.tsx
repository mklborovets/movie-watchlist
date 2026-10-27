import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SkeletonBlock} from '@/shared';

export interface MovieCardSkeletonProps {
  variant?: 'vertical' | 'horizontal';
  count?: number;
  className?: string;
}

const styles = StyleSheet.create({
  verticalPoster: {
    width: 140,
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  horizontalPoster: {
    width: 88,
    height: 128,
    borderRadius: 10,
  },
});

export const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({
  variant = 'vertical',
  count = 1,
  className = '',
}) => {
  const items = Array.from({length: count}, (_, index) => index);

  if (variant === 'horizontal') {
    return (
      <View className={className}>
        {items.map(item => (
          <View
            key={item}
            className="flex-row bg-dark-card border border-dark-border rounded-xl p-2.5 items-center mb-3">
            <SkeletonBlock style={styles.horizontalPoster} />
            <View className="flex-1 ml-3 justify-between py-1">
              <View>
                <SkeletonBlock height={18} width="70%" borderRadius={4} />
                <View className="mt-2">
                  <SkeletonBlock height={12} width="40%" borderRadius={4} />
                </View>
              </View>
              <View className="mt-4">
                <SkeletonBlock height={12} width="95%" borderRadius={4} />
                <View className="mt-1.5">
                  <SkeletonBlock height={12} width="60%" borderRadius={4} />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View className={`flex-row ${className}`}>
      {items.map(item => (
        <View key={item} className="mr-3">
          <SkeletonBlock style={styles.verticalPoster} />
          <View className="mt-2">
            <SkeletonBlock height={14} width={120} borderRadius={4} />
            <View className="mt-1.5">
              <SkeletonBlock height={10} width={60} borderRadius={4} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
