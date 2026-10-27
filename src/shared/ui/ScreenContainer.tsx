import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

export interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withPadding?: boolean;
  className?: string;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  withPadding = true,
  className = '',
  style,
}) => {
  const paddingClass = withPadding ? 'px-4' : '';

  return (
    <SafeAreaView
      className={`flex-1 bg-dark-background ${className}`}
      style={style}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D13" />
      {scrollable ? (
        <ScrollView
          className={`flex-1 ${paddingClass}`}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View className={`flex-1 ${paddingClass}`}>{children}</View>
      )}
    </SafeAreaView>
  );
};
