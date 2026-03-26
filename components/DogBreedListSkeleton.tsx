import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const THUMB = 72;

const SkeletonPulse = memo(function SkeletonPulse({
  style,
}: {
  style?: { width?: number | `${number}%`; height: number; borderRadius?: number };
}) {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.75, { duration: 650 }),
        withTiming(0.35, { duration: 650 }),
      ),
      -1,
      false,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height: style?.height,
          width: style?.width ?? '100%',
          borderRadius: style?.borderRadius ?? 8,
        },
      ]}
      className="bg-neutral-300 dark:bg-neutral-600"
    />
  );
});

export const DogBreedSkeletonRow = memo(function DogBreedSkeletonRow({
  index,
}: {
  index: number;
}) {
  return (
    <Animated.View
      entering={FadeIn.duration(280).delay(Math.min(index * 40, 360))}
      className="flex-row items-center gap-3 border-b border-neutral-200/80 px-4 py-2 dark:border-neutral-800"
    >
      <SkeletonPulse style={{ width: THUMB, height: THUMB, borderRadius: 12 }} />
      <View className="min-w-0 flex-1 justify-center gap-2.5 py-1">
        <SkeletonPulse style={{ height: 15, borderRadius: 6, width: '88%' }} />
        <SkeletonPulse style={{ height: 13, borderRadius: 6, width: '52%' }} />
      </View>
    </Animated.View>
  );
});

export function DogBreedListSkeleton({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <DogBreedSkeletonRow key={i} index={i} />
      ))}
    </>
  );
}
