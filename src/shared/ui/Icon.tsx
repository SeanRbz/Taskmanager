import React from 'react';
// Deep import: the package root pulls every icon family (and font) into the bundle.
import Feather from '@expo/vector-icons/Feather';
import { iconSize, useTheme } from '@/shared/theme';

export type IconName = React.ComponentProps<typeof Feather>['name'];

interface IconProps {
  name: IconName;
  size?: keyof typeof iconSize;
  color?: string;
  /** Give standalone, meaningful icons a label. Omit it for decorative icons. */
  accessibilityLabel?: string;
}

/** Single outline icon family (Feather) so stroke weight stays consistent. */
export function Icon({ name, size = 'md', color, accessibilityLabel }: IconProps) {
  const { colors } = useTheme();
  const decorative = !accessibilityLabel;

  return (
    <Feather
      name={name}
      size={iconSize[size]}
      color={color ?? colors.text}
      accessible={!decorative}
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={accessibilityLabel}
      accessibilityElementsHidden={decorative}
      importantForAccessibility={decorative ? 'no-hide-descendants' : 'yes'}
    />
  );
}
