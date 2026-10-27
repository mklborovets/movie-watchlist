import {useEffect} from 'react';
import {useColorScheme} from 'nativewind';
import {useThemeStore, ThemeMode} from './store';

export interface UseSwitchThemeResult {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useSwitchTheme = (): UseSwitchThemeResult => {
  const {setColorScheme} = useColorScheme();
  const theme = useThemeStore(state => state.theme);
  const setThemeInStore = useThemeStore(state => state.setTheme);
  const isInitialized = useThemeStore(state => state.isInitialized);
  const loadPersistedTheme = useThemeStore(state => state.loadPersistedTheme);

  useEffect(() => {
    if (!isInitialized) {
      loadPersistedTheme().then(savedTheme => {
        setColorScheme(savedTheme);
      });
    }
  }, [isInitialized, loadPersistedTheme, setColorScheme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setThemeInStore(nextTheme);
    setColorScheme(nextTheme);
  };

  const setTheme = (selectedTheme: ThemeMode) => {
    setThemeInStore(selectedTheme);
    setColorScheme(selectedTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
};
