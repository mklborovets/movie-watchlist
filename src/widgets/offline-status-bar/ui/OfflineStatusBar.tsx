import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {WifiOff, RefreshCw, CloudOff} from 'lucide-react-native';
import {useOfflineStatusBar} from '../model/useOfflineStatusBar';

export const OfflineStatusBar: React.FC = () => {
  const {
    isVisible,
    statusType,
    message,
    isSyncing,
    canRetry,
    handleSyncPress,
    containerClassName,
  } = useOfflineStatusBar();

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      className={`px-4 py-2 border-b flex-row items-center justify-between ${containerClassName}`}>
      <Animated.View className="flex-row items-center flex-1 mr-2">
        {statusType === 'offline' ? (
          <WifiOff size={16} color="#FFFFFF" />
        ) : statusType === 'syncing' ? (
          <RefreshCw size={16} color="#FFFFFF" />
        ) : (
          <CloudOff size={16} color="#FFFFFF" />
        )}
        <Text
          numberOfLines={1}
          className="text-white text-xs font-semibold ml-2">
          {message}
        </Text>
      </Animated.View>

      {canRetry ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSyncPress}
          disabled={isSyncing}
          className="bg-black/30 px-2.5 py-1 rounded-full border border-white/20">
          <Text className="text-white text-[11px] font-bold">Retry</Text>
        </TouchableOpacity>
      ) : null}
    </Animated.View>
  );
};
