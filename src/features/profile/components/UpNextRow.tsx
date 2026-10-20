import React from 'react';
import { Pressable, View } from 'react-native';
import { DueDateLabel } from '@/features/tasks/components/DueDateLabel';
import { PriorityPill } from '@/features/tasks/components/TaskPills';
import { PRIORITY_META } from '@/features/tasks/model/taskMeta';
import type { Task } from '@/features/tasks/model/types';
import { makeStyles, PRESSED_OPACITY, spacing, useTheme } from '@/shared/theme';
import { AppText, Icon } from '@/shared/ui';
import { describeDueDate } from '@/shared/utils/date';

interface UpNextRowProps {
  task: Task;
  last: boolean;
  onPress: (taskId: string) => void;
}

export function UpNextRow({ task, last, onPress }: UpNextRowProps) {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${task.title}. ${PRIORITY_META[task.priority].label} priority. ${describeDueDate(task.dueDate)}`}
      accessibilityHint="Opens task details"
      onPress={() => onPress(task.id)}
      style={({ pressed }) => [styles.row, !last && styles.divider, pressed && styles.pressed]}
    >
      <View style={styles.text}>
        <AppText variant="callout" weight="semibold" numberOfLines={1}>
          {task.title}
        </AppText>
        <View style={styles.meta}>
          <PriorityPill priority={task.priority} />
          <DueDateLabel dueDate={task.dueDate} />
        </View>
      </View>
      <Icon name="chevron-right" color={colors.textMuted} />
    </Pressable>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  pressed: { opacity: PRESSED_OPACITY },
  text: { flex: 1, gap: spacing.sm },
  meta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.md },
}));
