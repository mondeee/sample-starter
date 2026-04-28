//BaseScreen
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BaseScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-background-dark items-center justify-center"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-2xl font-bold text-text-dark">BaseScreen</Text>
    </View>
  );
}
