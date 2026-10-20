import React from 'react';
import { View } from 'react-native';
import { centeredContent, makeStyles, spacing } from '@/shared/theme';

/** Fixed bottom row for a screen's primary actions, kept outside the scroll view. */
export function ActionBar({ children }: { children: React.ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.bar}>
      <View style={styles.row}>{children}</View>
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  bar: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  row: {
    ...centeredContent,
    flexDirection: 'row',
    gap: spacing.md,
  },
}));
