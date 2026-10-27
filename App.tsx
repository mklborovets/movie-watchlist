import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-dark-background items-center justify-center">
      <StatusBar barStyle="light-content" backgroundColor="#0B0D13" />
      <View className="items-center px-6">
        <Text className="text-brand-primary text-3xl font-bold tracking-wider">
          MOVIE WATCHLIST
        </Text>
        <Text className="text-dark-muted text-base mt-2 text-center">
          Project initialized successfully
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
