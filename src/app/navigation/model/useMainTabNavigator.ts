import React from 'react';
import {Home, Search, Bookmark} from 'lucide-react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {useSwitchTheme} from '@/features/switch-theme';

export const useMainTabNavigator = () => {
  const {isDark} = useSwitchTheme();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#E50914',
    tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
    tabBarStyle: {
      backgroundColor: isDark ? '#161922' : '#FFFFFF',
      borderTopColor: isDark ? '#232733' : '#E5E7EB',
      borderTopWidth: 1,
      height: 60,
      paddingBottom: 8,
      paddingTop: 8,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  };

  const homeOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({color, size}) => React.createElement(Home, {size, color}),
  };

  const searchOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({color, size}) => React.createElement(Search, {size, color}),
  };

  const watchlistOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Watchlist',
    tabBarIcon: ({color, size}) => React.createElement(Bookmark, {size, color}),
  };

  return {
    screenOptions,
    homeOptions,
    searchOptions,
    watchlistOptions,
  };
};
