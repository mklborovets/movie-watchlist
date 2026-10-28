import {useColorScheme} from 'nativewind';

export interface UseScreenContainerProps {
  scrollable?: boolean;
  withPadding?: boolean;
}

export const useScreenContainer = ({
  scrollable = false,
  withPadding = true,
}: UseScreenContainerProps) => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    isScrollable: scrollable,
    paddingClass: withPadding ? 'px-4' : '',
    statusBarStyle: isDark
      ? ('light-content' as const)
      : ('dark-content' as const),
    statusBarBg: isDark ? '#0B0D13' : '#F9FAFB',
  };
};
