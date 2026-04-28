// /providers/AppProvider.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { ReactNode } from 'react';

import { queryClient } from '../lib/queryClient';

export function AppProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={colorScheme.colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        {children}
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
