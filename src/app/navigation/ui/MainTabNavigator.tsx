import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../model/types';
import {useMainTabNavigator} from '../model/useMainTabNavigator';
import {HomeRoute} from './HomeRoute';
import {SearchRoute} from './SearchRoute';
import {WatchlistRoute} from './WatchlistRoute';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const {screenOptions, homeOptions, searchOptions, watchlistOptions} =
    useMainTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeRoute} options={homeOptions} />
      <Tab.Screen
        name="Search"
        component={SearchRoute}
        options={searchOptions}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistRoute}
        options={watchlistOptions}
      />
    </Tab.Navigator>
  );
};
