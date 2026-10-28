import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useSwitchTheme} from '@/features/switch-theme';

export const useRootNavigator = () => {
  const {isDark} = useSwitchTheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'fade_from_bottom',
    contentStyle: {
      backgroundColor: isDark ? '#0B0D13' : '#F9FAFB',
    },
  };

  return {
    screenOptions,
  };
};
