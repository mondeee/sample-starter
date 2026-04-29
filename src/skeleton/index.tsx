// components/skeleton/Skeleton.tsx

import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const Skeleton = ({ className = '' }) => {
  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(200, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className={`bg-[#1A1A1A] overflow-hidden rounded-xl ${className}`}>
      {/* Shimmer overlay */}
      <Animated.View style={animatedStyle} className="absolute top-0 bottom-0">
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.15)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: 80, height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};
