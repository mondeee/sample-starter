import type { AxiosRequestConfig } from 'axios';

import { getDogApiBaseUrl } from './config';
import { getRequest } from './http';

export type DogBreedsListResponse = {
  message: Record<string, string[]>;
  status: string;
};

export async function dogbreedsListApi(
  config?: AxiosRequestConfig,
): Promise<DogBreedsListResponse> {
  return getRequest<DogBreedsListResponse>('/breeds/list/all', {
    baseURL: getDogApiBaseUrl(),
    ...config,
  });
}
