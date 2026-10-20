import React from 'react';
import { View } from 'react-native';
import { fontFamily, useTheme } from '@/shared/theme';
import { AppText } from './AppText';

interface AvatarProps {
  initials: string;
  size?: number;
}

/** Decorative: always rendered next to the person's name, so hidden from screen readers. */
export function Avatar({ initials, size = 40 }: AvatarProps) {
  const { colors } = useTheme();

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppText
        allowFontScaling={false}
        style={{
          color: colors.onPrimary,
          fontFamily: fontFamily.bold,
          fontSize: Math.round(size * 0.38),
          lineHeight: Math.round(size * 0.5),
        }}
      >
        {initials}
      </AppText>
    </View>
  );
}
