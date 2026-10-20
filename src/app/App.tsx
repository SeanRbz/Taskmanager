import React from 'react';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { RootNavigator } from '@/navigation/RootNavigator';
import { makeStore } from '@/store';
import { AppProviders } from './AppProviders';

const store = makeStore();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  // On a font error, render with the system font rather than blocking the app.
  if (!fontsLoaded && !fontError) return null;

  return (
    <AppProviders store={store}>
      <RootNavigator />
    </AppProviders>
  );
}
