import React from 'react';
import { View } from 'react-native';
import { makeStyles, spacing } from '@/shared/theme';
import { AppText } from './AppText';

interface StatTileProps {
  value: number;
  label: string;
  /** Larger, brand-coloured number for the headline metric. */
  emphasis?: boolean;
}

export function StatTile({ value, label, emphasis = false }: StatTileProps) {
  const styles = useStyles();

  return (
    <View style={styles.tile} accessible accessibilityLabel={`${value} ${label}`}>
      <AppText variant={emphasis ? 'display' : 'title'} color={emphasis ? 'primary' : 'text'}>
        {value}
      </AppText>
      <AppText variant="caption" color="textMuted">
        {label}
      </AppText>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  tile: { flex: 1, gap: spacing.xxs },
}));
