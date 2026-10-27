export interface UseScreenContainerProps {
  scrollable?: boolean;
  withPadding?: boolean;
}

export const useScreenContainer = ({
  scrollable = false,
  withPadding = true,
}: UseScreenContainerProps) => {
  return {
    isScrollable: scrollable,
    paddingClass: withPadding ? 'px-4' : '',
  };
};
