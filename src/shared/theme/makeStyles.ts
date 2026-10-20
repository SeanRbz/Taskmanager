import { StyleSheet } from 'react-native';
import { AppTheme } from './colors';
import { useTheme } from './ThemeProvider';

/**
 * Creates a hook returning theme-aware styles. Each theme object gets exactly
 * one StyleSheet, so styles stay referentially stable across renders.
 */
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(factory: (theme: AppTheme) => T) {
  const cache = new WeakMap<AppTheme, T>();

  return function useStyles(): T {
    const theme = useTheme();
    let styles = cache.get(theme);
    if (!styles) {
      styles = StyleSheet.create(factory(theme));
      cache.set(theme, styles);
    }
    return styles;
  };
}
