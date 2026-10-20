import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { AppTheme, ColorScheme, darkTheme, lightTheme } from './colors';

const ThemeContext = createContext<AppTheme>(lightTheme);

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Force a scheme (tests, previews). Defaults to the OS setting. */
  scheme?: ColorScheme;
}

export function ThemeProvider({ children, scheme }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const theme = (scheme ?? systemScheme) === 'dark' ? darkTheme : lightTheme;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): AppTheme {
  return useContext(ThemeContext);
}
