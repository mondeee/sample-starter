/**
 * Your app backend (optional). Set `EXPO_PUBLIC_API_URL` in `.env`.
 */
export function getApiBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (url) return url.replace(/\/$/, '');
  return '';
}

/**
 * Dog CEO API base. Set `EXPO_PUBLIC_DOG_API_URL` in `.env` (see `.env.example`).
 */
export function getDogApiBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_DOG_API_URL;
  if (url) return url.replace(/\/$/, '');
  return '';
}
