export interface UseHomeHeaderProps {
  onSearchPress?: () => void;
}

export const useHomeHeader = ({onSearchPress}: UseHomeHeaderProps = {}) => {
  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    }
  };

  return {
    title: 'MOVIE WATCHLIST',
    hasSearchAction: Boolean(onSearchPress),
    handleSearchPress,
  };
};
