import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../model/types';
import {useRootNavigator} from '../model/useRootNavigator';
import {MainTabNavigator} from './MainTabNavigator';
import {MovieDetailsRoute} from './MovieDetailsRoute';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const {screenOptions} = useRootNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
