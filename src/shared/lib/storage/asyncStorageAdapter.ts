import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageAdapter = {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const rawValue = await AsyncStorage.getItem(key);
      if (rawValue === null) {
        return null;
      }
      return JSON.parse(rawValue) as T;
    } catch {
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
    } catch {
      return;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      return;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {
      return;
    }
  },
};
