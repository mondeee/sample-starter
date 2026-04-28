import type { AxiosRequestConfig } from 'axios';
import type { QueryClient } from '@tanstack/react-query';

import { getDogApiBaseUrl } from './config';
import { dogbreedsListApi } from './dogBreedsListApi';
import { getRequest } from './http';

export type DogBreedGalleryItem = {
  id: string;
  label: string;
  imageUrl: string;
};

export type DogBreedsGalleryPage = {
  items: DogBreedGalleryItem[];
  /** Offset to pass as the next `pageParam`. */
  nextOffset: number;
  total: number;
};

type DogBreedGallerySeed = {
  id: string;
  label: string;
  apiPath: string;
};

type DogBreedRandomImageResponse = {
  message: string;
  status: string;
};

const IMAGE_CONCURRENCY = 8;

export const dogBreedsSeedsQueryKey = ['dogBreeds', 'seeds'] as const;

function capitalize(word: string): string {
  if (!word) return word;
  return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
}

export function flattenBreedsToSeeds(
  message: Record<string, string[]>,
): DogBreedGallerySeed[] {
  const rows: DogBreedGallerySeed[] = [];
  for (const [breed, subs] of Object.entries(message)) {
    if (subs.length === 0) {
      rows.push({ id: breed, label: capitalize(breed), apiPath: breed });
    } else {
      for (const sub of subs) {
        const apiPath = `${breed}/${sub}`;
        rows.push({
          id: apiPath,
          label: `${capitalize(sub)} ${capitalize(breed)}`,
          apiPath,
        });
      }
    }
  }
  return rows;
}

export async function fetchDogBreedsSeeds(
  signal?: AbortSignal,
): Promise<DogBreedGallerySeed[]> {
  const list = await dogbreedsListApi({ signal });
  if (list.status !== 'success') {
    throw new Error('Dog API returned an unexpected status');
  }
  return flattenBreedsToSeeds(list.message);
}

async function fetchBreedRandomImage(
  apiPath: string,
  config?: AxiosRequestConfig,
): Promise<string> {
  try {
    const res = await getRequest<DogBreedRandomImageResponse>(
      `/breed/${apiPath}/images/random`,
      { baseURL: getDogApiBaseUrl(), ...config },
    );
    return res.message;
  } catch {
    return '';
  }
}

async function promisePool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const result: R[] = new Array(items.length);
  let next = 0;

  async function worker() {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      result[i] = await fn(items[i]!, i);
    }
  }

  const workers = Math.min(limit, items.length) || 1;
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return result;
}

/**
 * Loads one page of gallery rows. The full breed list is fetched once and cached under {@link dogBreedsSeedsQueryKey}.
 */
export async function fetchDogBreedsGalleryPage(
  queryClient: QueryClient,
  offset: number,
  pageSize: number,
  signal?: AbortSignal,
): Promise<DogBreedsGalleryPage> {
  let seeds = queryClient.getQueryData<DogBreedGallerySeed[]>(
    dogBreedsSeedsQueryKey,
  );
  if (!seeds) {
    seeds = await fetchDogBreedsSeeds(signal);
    queryClient.setQueryData(dogBreedsSeedsQueryKey, seeds);
  }

  const slice = seeds.slice(offset, offset + pageSize);

  const imageUrls =
    slice.length === 0
      ? []
      : await promisePool(slice, IMAGE_CONCURRENCY, (seed) =>
          fetchBreedRandomImage(seed.apiPath, { signal }),
        );

  const items = slice.map((seed, i) => ({
    id: seed.id,
    label: seed.label,
    imageUrl: imageUrls[i] ?? '',
  }));

  return {
    items,
    nextOffset: offset + pageSize,
    total: seeds.length,
  };
}
