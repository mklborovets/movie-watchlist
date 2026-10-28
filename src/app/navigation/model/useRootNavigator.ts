import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const useRootNavigator = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'fade_from_bottom',
    contentStyle: {
      backgroundColor: '#0B0D13',
    },
  };

  return {
    screenOptions,
  };
};
