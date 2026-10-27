export interface UseMovieCardSkeletonProps {
  variant?: 'vertical' | 'horizontal';
  count?: number;
}

export const useMovieCardSkeleton = ({
  variant = 'vertical',
  count = 1,
}: UseMovieCardSkeletonProps) => {
  const items = Array.from({length: count}, (_, index) => index);
  const isHorizontal = variant === 'horizontal';

  return {
    items,
    isHorizontal,
  };
};
