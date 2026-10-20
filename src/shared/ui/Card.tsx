import React from 'react';
import { View, ViewProps } from 'react-native';
import { makeStyles, radius, spacing } from '@/shared/theme';

interface CardProps extends ViewProps {
  padded?: boolean;
}

/** Flat surface: separated from the background by a hairline border, not a shadow. */
export function Card({ padded = true, style, ...rest }: CardProps) {
  const styles = useStyles();
  return <View {...rest} style={[styles.card, padded && styles.padded, style]} />;
}

const useStyles = makeStyles(({ colors }) => ({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  padded: { padding: spacing.lg },
}));
