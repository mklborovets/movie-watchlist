import {useSwitchTheme} from '@/features/switch-theme';

export const useThemeProvider = () => {
  const {theme, isDark} = useSwitchTheme();

  return {
    theme,
    isDark,
  };
};
