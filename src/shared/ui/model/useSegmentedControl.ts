export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

export interface UseSegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

export const useSegmentedControl = <T extends string = string>({
  options,
  selectedValue,
  onSelect,
}: UseSegmentedControlProps<T>) => {
  const handleSelect = (value: T) => {
    if (value !== selectedValue) {
      onSelect(value);
    }
  };

  const isSelected = (value: T) => value === selectedValue;

  return {
    options,
    selectedValue,
    handleSelect,
    isSelected,
  };
};
