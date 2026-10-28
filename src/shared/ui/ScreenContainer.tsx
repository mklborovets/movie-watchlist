import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {useScreenContainer} from './model/useScreenContainer';

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
  const {isScrollable, paddingClass, statusBarStyle, statusBarBg} =
    useScreenContainer({
      scrollable,
      withPadding,
    });

  return (
    <SafeAreaView
      className={`flex-1 bg-light-background dark:bg-dark-background ${className}`}
      style={style}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
      {isScrollable ? (
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
