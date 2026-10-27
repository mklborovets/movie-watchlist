import React from 'react';
import {TouchableOpacity, View, Text, ViewStyle} from 'react-native';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'glass';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  badgeCount?: number;
  accessibilityLabel?: string;
  className?: string;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  badgeCount,
  accessibilityLabel,
  className = '',
  style,
}) => {
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

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={style}
      className={`items-center justify-center relative ${sizeStyles[size]} ${
        variantStyles[variant]
      } ${disabled ? 'opacity-40' : ''} ${className}`}>
      {icon}
      {typeof badgeCount === 'number' && badgeCount > 0 ? (
        <View className="absolute -top-1 -right-1 bg-brand-primary min-w-[18px] h-[18px] px-1 rounded-full items-center justify-center border-2 border-dark-background">
          <Text className="text-white text-[10px] font-bold">
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
