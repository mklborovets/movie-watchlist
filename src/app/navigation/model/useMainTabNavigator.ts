import React from 'react';
import {Home, Search, Bookmark} from 'lucide-react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export const useMainTabNavigator = () => {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#E50914',
    tabBarInactiveTintColor: '#9CA3AF',
    tabBarStyle: {
      backgroundColor: '#161922',
      borderTopColor: '#232733',
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
