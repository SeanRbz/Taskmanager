import React from 'react';
import { View } from 'react-native';
import { makeStyles, spacing, useTheme } from '@/shared/theme';
import { AppText, Icon } from '@/shared/ui';
import { describeDueDate, formatShortDate, getDueStatus } from '@/shared/utils/date';

interface DueDateLabelProps {
  dueDate: string;
  /** Plain date without urgency styling — for completed tasks. */
  muted?: boolean;
}

export function DueDateLabel({ dueDate, muted = false }: DueDateLabelProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const status = getDueStatus(dueDate);
  const urgent = !muted && (status === 'overdue' || status === 'today');
  const color = urgent ? colors.accent : colors.textMuted;

  return (
    <View style={styles.row}>
      <Icon name={urgent ? 'alert-circle' : 'calendar'} size="xs" color={color} />
      <AppText variant="caption" weight={urgent ? 'semibold' : 'medium'} style={{ color }}>
        {muted ? `Due ${formatShortDate(dueDate)}` : describeDueDate(dueDate)}
      </AppText>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
}));
