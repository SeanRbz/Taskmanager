import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { AppTheme, fontFamily } from '@/shared/theme';

// The family already encodes the weight; a numeric fontWeight on top of a custom
// family makes Android fall back to the system font.
const font = (family: string) => ({ fontFamily: family, fontWeight: 'normal' as const });

export function createNavigationTheme({ scheme, colors }: AppTheme): Theme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
    fonts: {
      regular: font(fontFamily.regular),
      medium: font(fontFamily.medium),
      bold: font(fontFamily.bold),
      heavy: font(fontFamily.extrabold),
    },
  };
}
