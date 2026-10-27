export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'glass';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface UseIconButtonProps {
  onPress: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  badgeCount?: number;
  className?: string;
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-8 h-8 rounded-lg',
  md: 'w-10 h-10 rounded-full',
  lg: 'w-12 h-12 rounded-full',
};

const variantStyles: Record<IconButtonVariant, string> = {
  primary: 'bg-brand-primary border-transparent',
  secondary: 'bg-dark-card border border-dark-border',
  ghost: 'bg-transparent border-transparent',
  danger: 'bg-red-950/80 border border-red-800/50',
  glass: 'bg-black/40 border border-white/20',
};

export const useIconButton = ({
  onPress,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  badgeCount,
  className = '',
}: UseIconButtonProps) => {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const isBadgeVisible = typeof badgeCount === 'number' && badgeCount > 0;
  const formattedBadgeCount =
    typeof badgeCount === 'number' && badgeCount > 99
      ? '99+'
      : String(badgeCount || '');

  const containerClassName = `items-center justify-center relative ${
    sizeStyles[size]
  } ${variantStyles[variant]} ${disabled ? 'opacity-40' : ''} ${className}`;

  return {
    handlePress,
    isDisabled: disabled,
    isBadgeVisible,
    formattedBadgeCount,
    containerClassName,
  };
};
