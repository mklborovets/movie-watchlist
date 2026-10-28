import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  useSegmentedControl,
  SegmentedControlOption,
} from './model/useSegmentedControl';

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  className?: string;
}

export const SegmentedControl = <T extends string = string>({
  options,
  selectedValue,
  onSelect,
  className = '',
}: SegmentedControlProps<T>): React.JSX.Element => {
  const {handleSelect, isSelected} = useSegmentedControl({
    options,
    selectedValue,
    onSelect,
  });

  return (
    <View
      className={`flex-row bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-1 ${className}`}>
      {options.map(option => {
        const active = isSelected(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.8}
            onPress={() => handleSelect(option.value)}
            className={`flex-1 py-2.5 px-3 rounded-lg items-center justify-center flex-row ${
              active ? 'bg-brand-primary' : 'bg-transparent'
            }`}>
            <Text
              className={`text-sm font-semibold ${
                active ? 'text-white' : 'text-light-muted dark:text-dark-muted'
              }`}>
              {option.label}
            </Text>
            {typeof option.count === 'number' ? (
              <View
                className={`ml-1.5 px-1.5 py-0.5 rounded-full ${
                  active ? 'bg-white/20' : 'bg-light-border dark:bg-dark-border'
                }`}>
                <Text
                  className={`text-xs font-bold ${
                    active
                      ? 'text-white'
                      : 'text-light-muted dark:text-dark-muted'
                  }`}>
                  {option.count}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
