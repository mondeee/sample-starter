import { DogBreedDetailModal } from '@/components/DogBreedDetailModal';
import { DogBreedListSkeleton } from '@/components/DogBreedListSkeleton';
import { DogBreedRow } from '@/components/DogBreedRow';
import { useDogBreedsGalleryInfinite } from '@/hooks/useDogBreedsGallery';
import type { DogBreedGalleryItem } from '@/lib/api/dogBreedsGalleryApi';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<DogBreedGalleryItem | null>(null);
  const {
    flatItems,
    total,
    isPending,
    isError,
    error,
    onRefresh,
    onEndReached,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
  } = useDogBreedsGalleryInfinite();

  const renderItem = useCallback<ListRenderItem<DogBreedGalleryItem>>(
    ({ item }) => (
      <DogBreedRow
        label={item.label}
        imageUrl={item.imageUrl}
        onPress={() => setSelected(item)}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: DogBreedGalleryItem) => item.id, []);

  const ListFooterComponent = useCallback(
    () =>
      isFetchingNextPage ? (
        <View className="items-center py-4">
          <ActivityIndicator />
        </View>
      ) : null,
    [isFetchingNextPage],
  );

  const summary =
    total != null
      ? `${flatItems.length} loaded · ${total} total${hasNextPage ? '' : ' · end'}`
      : `${flatItems.length} loaded`;

  const listHeader = (
    <View className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <Text className="text-2xl font-bold text-text-DEFAULT dark:text-text-dark">
        Dog breeds
      </Text>
      <Text className="text-text-DEFAULT/70 dark:text-text-dark/70 mt-1 text-sm">
        FlashList · 20 per page · {summary}
      </Text>
    </View>
  );

  const skeletonHeader = (
    <View className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <Text className="text-2xl font-bold text-text-DEFAULT dark:text-text-dark">
        Dog breeds
      </Text>
      <Text className="text-text-DEFAULT/70 dark:text-text-dark/70 mt-1 text-sm">
        FlashList · 20 per page · Loading first page…
      </Text>
    </View>
  );

  if (isPending && flatItems.length === 0) {
    return (
      <View
        className="flex-1 bg-background dark:bg-background-dark"
        style={{ paddingTop: insets.top }}
      >
        {skeletonHeader}
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <DogBreedListSkeleton count={12} />
        </ScrollView>
      </View>
    );
  }

  if (isError && flatItems.length === 0) {
    return (
      <View
        className="flex-1 items-center justify-center bg-background px-6 dark:bg-background-dark"
        style={{ paddingTop: insets.top }}
      >
        <Text className="mb-4 text-center text-base text-red-500">
          {error instanceof Error ? error.message : 'Could not load breeds'}
        </Text>
        <Text
          className="text-text-DEFAULT dark:text-text-dark text-sm underline"
          onPress={() => onRefresh()}
        >
          Try again
        </Text>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      {listHeader}
      <FlashList
        style={{ flex: 1 }}
        data={flatItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        drawDistance={400}
        removeClippedSubviews={Platform.OS !== 'web'}
        onRefresh={onRefresh}
        refreshing={isRefetching && !isFetchingNextPage}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.35}
        ListFooterComponent={ListFooterComponent}
      />
      <DogBreedDetailModal
        item={selected}
        visible={selected != null}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}
