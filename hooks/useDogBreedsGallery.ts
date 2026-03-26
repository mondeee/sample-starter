import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import {
  dogBreedsSeedsQueryKey,
  fetchDogBreedsGalleryPage,
} from '@/lib/api/dogBreedsGalleryApi';

export const dogBreedsGalleryInfiniteQueryKey = [
  'dogBreeds',
  'gallery',
  'infinite',
] as const;

const PAGE_SIZE = 20;

export function useDogBreedsGalleryInfinite() {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: [...dogBreedsGalleryInfiniteQueryKey, PAGE_SIZE] as const,
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) =>
      fetchDogBreedsGalleryPage(
        queryClient,
        pageParam,
        PAGE_SIZE,
        signal,
      ),
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset < lastPage.total ? lastPage.nextOffset : undefined,
    staleTime: 1000 * 60 * 10,
  });

  const flatItems = useMemo(
    () => query.data?.pages.flatMap((p) => p.items) ?? [],
    [query.data?.pages],
  );

  const total = query.data?.pages[0]?.total;

  const onRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: dogBreedsSeedsQueryKey });
    void queryClient.resetQueries({
      queryKey: [...dogBreedsGalleryInfiniteQueryKey, PAGE_SIZE],
    });
  }, [queryClient]);

  const onEndReached = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage();
    }
  }, [query.fetchNextPage, query.hasNextPage, query.isFetchingNextPage]);

  return {
    ...query,
    flatItems,
    total,
    pageSize: PAGE_SIZE,
    onRefresh,
    onEndReached,
  };
}
