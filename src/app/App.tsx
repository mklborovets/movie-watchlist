import React from 'react';
import {AppProviders} from './providers';
import {RootNavigator} from './navigation';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
};
