import type { DogBreedGalleryItem } from '@/lib/api/dogBreedsGalleryApi';
import { Image } from 'expo-image';
import { Modal, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  item: DogBreedGalleryItem | null;
  visible: boolean;
  onClose: () => void;
};

export function DogBreedDetailModal({ item, visible, onClose }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {item ? (
        <View className="flex-1 justify-end">
          <Pressable
            className="absolute inset-0 bg-black/55"
            onPress={onClose}
            accessibilityLabel="Dismiss"
            accessibilityRole="button"
          />
          <Animated.View
            key={item.id}
            entering={FadeInDown.springify().damping(19).stiffness(210)}
            className="w-full rounded-t-3xl bg-background px-5 pb-2 pt-3 shadow-2xl dark:bg-background-dark"
            style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          >
            <View className="mb-4 h-1 w-10 self-center rounded-full bg-neutral-300 dark:bg-neutral-600" />
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: '100%',
                  height: 280,
                  borderRadius: 16,
                }}
                contentFit="cover"
                transition={280}
                cachePolicy="memory-disk"
              />
            ) : (
              <View
                className="items-center justify-center rounded-2xl bg-neutral-200 dark:bg-neutral-800"
                style={{ height: 280, width: '100%' }}
              >
                <Text className="text-neutral-500 dark:text-neutral-400">
                  No image available
                </Text>
              </View>
            )}
            <Text className="text-text-DEFAULT dark:text-text-dark mt-4 text-center text-2xl font-bold">
              {item.label}
            </Text>
            <Text className="text-text-DEFAULT/60 dark:text-text-dark/60 mt-1 text-center text-sm">
              Dog CEO · random breed photo
            </Text>
            <Pressable
              onPress={onClose}
              className="mt-5 rounded-2xl bg-neutral-200 py-3.5 active:opacity-80 dark:bg-neutral-800"
              accessibilityRole="button"
              accessibilityLabel="Close details"
            >
              <Text className="text-center text-base font-semibold text-text-DEFAULT dark:text-text-dark">
                Close
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      ) : null}
    </Modal>
  );
}
