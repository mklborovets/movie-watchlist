import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageAdapter = {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const rawValue = await AsyncStorage.getItem(key);
      if (rawValue === null) {
        return null;
      }
      return JSON.parse(rawValue) as T;
    } catch (error) {
      console.warn(
        `[asyncStorageAdapter] getItem failed for key "${key}":`,
        error,
      );
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(
        `[asyncStorageAdapter] setItem failed for key "${key}":`,
        error,
      );
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn(
        `[asyncStorageAdapter] removeItem failed for key "${key}":`,
        error,
      );
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.warn('[asyncStorageAdapter] clear failed:', error);
    }
  },
};
