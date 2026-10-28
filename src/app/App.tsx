import React from 'react';
import {StatusBar} from 'react-native';
import {AppProviders} from './providers';
import {RootNavigator} from './navigation';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D13" />
      <RootNavigator />
    </AppProviders>
  );
};
