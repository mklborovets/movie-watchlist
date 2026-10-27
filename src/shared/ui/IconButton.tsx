import React from 'react';
import {TouchableOpacity, View, Text, ViewStyle} from 'react-native';
import {
  useIconButton,
  IconButtonVariant,
  IconButtonSize,
} from './model/useIconButton';

export type {IconButtonVariant, IconButtonSize};

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
  const {
    handlePress,
    isDisabled,
    isBadgeVisible,
    formattedBadgeCount,
    containerClassName,
  } = useIconButton({
    onPress,
    variant,
    size,
    disabled,
    badgeCount,
    className,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={style}
      className={containerClassName}>
      {icon}
      {isBadgeVisible ? (
        <View className="absolute -top-1 -right-1 bg-brand-primary min-w-[18px] h-[18px] px-1 rounded-full items-center justify-center border-2 border-dark-background">
          <Text className="text-white text-[10px] font-bold">
            {formattedBadgeCount}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
