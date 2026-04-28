import type { AxiosRequestConfig } from 'axios';

import { apiClient } from './client';

export async function getRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

export async function postRequest<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await apiClient.post<TResponse>(url, body, config);
  return data;
}

export async function putRequest<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await apiClient.put<TResponse>(url, body, config);
  return data;
}

export async function patchRequest<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await apiClient.patch<TResponse>(url, body, config);
  return data;
}

export async function deleteRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await apiClient.delete<T>(url, config);
  return data;
}
