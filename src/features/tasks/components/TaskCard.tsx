import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { makeStyles, PRESSED_OPACITY, radius, spacing, useTheme } from '@/shared/theme';
import { AppText, Icon } from '@/shared/ui';
import { describeDueDate } from '@/shared/utils/date';
import { isDone, PRIORITY_META, STATUS_META } from '../model/taskMeta';
import type { Task } from '../model/types';
import { CompletionToggle } from './CompletionToggle';
import { DueDateLabel } from './DueDateLabel';
import { PriorityPill } from './TaskPills';

interface TaskCardProps {
  task: Task;
  /** A save for this task is in flight; completion is locked until it settles. */
  pending: boolean;
  onOpen: (taskId: string) => void;
  onToggle: (taskId: string) => void;
}

/**
 * The toggle and the body are sibling pressables (not nested) so screen readers
 * can focus each one separately.
 */
export const TaskCard = memo(function TaskCard({ task, pending, onOpen, onToggle }: TaskCardProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const done = isDone(task);
  const summary = [
    task.title,
    `${PRIORITY_META[task.priority].label} priority`,
    STATUS_META[task.status].label,
    done ? null : describeDueDate(task.dueDate),
    `Assigned to ${task.assignee}`,
  ]
    .filter(Boolean)
    .join('. ');

  return (
    <View style={[styles.card, pending && styles.pending]}>
      <CompletionToggle
        done={done}
        label={task.title}
        disabled={pending}
        onToggle={() => onToggle(task.id)}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={summary}
        accessibilityHint="Opens task details"
        onPress={() => onOpen(task.id)}
        style={({ pressed }) => [styles.body, pressed && styles.pressed]}
      >
        <View style={styles.text}>
          <AppText
            variant="callout"
            weight="semibold"
            numberOfLines={2}
            style={done && styles.titleDone}
          >
            {task.title}
          </AppText>
          <View style={styles.meta}>
            <PriorityPill priority={task.priority} />
            <DueDateLabel dueDate={task.dueDate} muted={done} />
            <View style={styles.assignee}>
              <Icon name="user" size="xs" color={colors.textMuted} />
              <AppText variant="caption" color="textMuted" numberOfLines={1}>
                {task.assignee}
              </AppText>
            </View>
          </View>
        </View>
        <Icon name="chevron-right" color={colors.textMuted} />
      </Pressable>
    </View>
  );
});

const useStyles = makeStyles(({ colors }) => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pending: { opacity: 0.7 },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingRight: spacing.md,
  },
  pressed: { opacity: PRESSED_OPACITY },
  text: { flex: 1, gap: spacing.sm },
  titleDone: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: spacing.md,
    rowGap: spacing.xs,
  },
  assignee: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
}));
