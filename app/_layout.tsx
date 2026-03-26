// app/_layout.tsx
import { Stack } from 'expo-router'
import '../global.css'
import { AppProvider } from '../providers/AppProvider'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={ { headerShown: false } } />
        <Stack.Screen name="modal" options={ { presentation: 'modal', title: 'Modal' } } />
      </Stack>
    </AppProvider>
  )
}