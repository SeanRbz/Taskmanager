import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppStore } from '@/store';
import { ColorScheme, ThemeProvider, useTheme } from '@/shared/theme';
import { AppErrorBoundary } from './AppErrorBoundary';

interface AppProvidersProps {
  store: AppStore;
  children: React.ReactNode;
  /** Force a colour scheme (tests); defaults to the OS setting. */
  scheme?: ColorScheme;
}

/** Every app-wide provider, in one place so tests render screens the same way the app does. */
export function AppProviders({ store, children, scheme }: AppProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ThemeProvider scheme={scheme}>
          <ThemedStatusBar />
          <AppErrorBoundary>{children}</AppErrorBoundary>
        </ThemeProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}

function ThemedStatusBar() {
  const { scheme } = useTheme();
  return <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />;
}
