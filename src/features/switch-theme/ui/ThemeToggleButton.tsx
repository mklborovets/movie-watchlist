import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Sun, Moon} from 'lucide-react-native';
import {useSwitchTheme} from '../model/useSwitchTheme';

export const ThemeToggleButton: React.FC = () => {
  const {isDark, toggleTheme} = useSwitchTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel="Toggle color theme"
      className="w-10 h-10 rounded-full items-center justify-center bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
      {isDark ? (
        <Sun size={20} color="#F5C518" />
      ) : (
        <Moon size={20} color="#4B5563" />
      )}
    </TouchableOpacity>
  );
};
