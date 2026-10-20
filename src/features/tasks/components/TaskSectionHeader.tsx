import React from 'react';
import { View } from 'react-native';
import { makeStyles, radius, spacing, useTheme } from '@/shared/theme';
import { AppText, Icon } from '@/shared/ui';
import { pluralize } from '@/shared/utils/text';
import { STATUS_META } from '../model/taskMeta';
import type { TaskStatus } from '../model/types';

interface TaskSectionHeaderProps {
  status: TaskStatus;
  count: number;
}

export function TaskSectionHeader({ status, count }: TaskSectionHeaderProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { label, icon } = STATUS_META[status];

  return (
    <View
      style={styles.header}
      accessible
      accessibilityRole="header"
      accessibilityLabel={`${label}, ${pluralize(count, 'task')}`}
    >
      <Icon name={icon} size="sm" color={colors.textMuted} />
      <AppText variant="label" color="textMuted" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.count}>
        <AppText variant="caption" weight="bold" color="textMuted">
          {count}
        </AppText>
      </View>
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  label: { textTransform: 'uppercase', letterSpacing: 0.6 },
  count: {
    minWidth: 24,
    alignItems: 'center',
    paddingHorizontal: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
}));
