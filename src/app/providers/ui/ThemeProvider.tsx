import React, {ReactNode} from 'react';
import {useThemeProvider} from '../model/useThemeProvider';

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  useThemeProvider();

  return <>{children}</>;
};
