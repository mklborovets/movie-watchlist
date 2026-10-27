import {create} from 'zustand';
import {STORAGE_KEYS, asyncStorageAdapter} from '@/shared';

export type ThemeMode = 'dark' | 'light';

interface ThemeState {
  theme: ThemeMode;
  isInitialized: boolean;
  setTheme: (theme: ThemeMode) => void;
  loadPersistedTheme: () => Promise<ThemeMode>;
}

export const useThemeStore = create<ThemeState>(set => ({
  theme: 'dark',
  isInitialized: false,
  setTheme: (theme: ThemeMode) => {
    set({theme});
    asyncStorageAdapter.setItem(STORAGE_KEYS.theme, theme);
  },
  loadPersistedTheme: async () => {
    const savedTheme = await asyncStorageAdapter.getItem<ThemeMode>(
      STORAGE_KEYS.theme,
    );
    const resolvedTheme: ThemeMode = savedTheme || 'dark';
    set({theme: resolvedTheme, isInitialized: true});
    return resolvedTheme;
  },
}));
