import React from 'react';
import { Text, TextProps } from 'react-native';
import {
  fontFamily,
  FontWeight,
  ThemeColors,
  typography,
  TypographyVariant,
  useTheme,
} from '@/shared/theme';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  /** Overrides the variant's default weight. */
  weight?: FontWeight;
  color?: keyof ThemeColors;
  align?: 'left' | 'center' | 'right';
}

/**
 * The only component that renders text. Custom fonts need an explicit family
 * per weight (fontWeight alone does not select them on Android).
 */
export function AppText({
  variant = 'body',
  weight,
  color = 'text',
  align,
  style,
  ...rest
}: AppTextProps) {
  const { colors } = useTheme();
  const type = typography[variant];

  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontFamily[weight ?? type.weight],
          fontSize: type.fontSize,
          lineHeight: type.lineHeight,
          color: colors[color],
          textAlign: align,
        },
        style,
      ]}
    />
  );
}
