import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { memo, useMemo } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

const THUMB = 72;

type Props = {
  label: string;
  imageUrl: string;
  onPress?: () => void;
};

export const DogBreedRow = memo(function DogBreedRow({
  label,
  imageUrl,
  onPress,
}: Props) {
  const source = useMemo(
    () => (imageUrl ? { uri: imageUrl } : null),
    [imageUrl],
  );

  const content = (
    <>
      <View
        className="overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800"
        style={{ width: THUMB, height: THUMB }}
      >
        {source ? (
          <Image
            source={source}
            style={{ width: THUMB, height: THUMB }}
            contentFit="cover"
            transition={120}
            recyclingKey={imageUrl}
            cachePolicy="memory-disk"
          />
        ) : null}
      </View>
      <Text
        className="min-w-0 flex-1 text-base font-medium text-text-DEFAULT dark:text-text-dark"
        numberOfLines={2}
      >
        {label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={() => {
          if (Platform.OS !== 'web') {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onPress();
        }}
        className="flex-row items-center gap-3 border-b border-neutral-200/90 bg-background px-4 py-2 active:bg-neutral-100 dark:border-neutral-800 dark:bg-background-dark dark:active:bg-neutral-900/80"
        accessibilityRole="button"
        accessibilityLabel={`Open details for ${label}`}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View className="flex-row items-center gap-3 border-b border-neutral-200/90 px-4 py-2 dark:border-neutral-800">
      {content}
    </View>
  );
});
