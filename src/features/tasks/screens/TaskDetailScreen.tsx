import React from 'react';
import { ScrollView, View } from 'react-native';
import type { TasksStackScreenProps } from '@/navigation/types';
import { centeredContent, makeStyles, spacing, useTheme } from '@/shared/theme';
import { ActionBar, AppText, Avatar, Button, Card, Icon, IconName } from '@/shared/ui';
import { describeDueDate, formatDate, getDueStatus } from '@/shared/utils/date';
import { getInitials } from '@/shared/utils/text';
import { TaskNotFound } from '../components/TaskNotFound';
import { PriorityPill, StatusPill } from '../components/TaskPills';
import { useIsTaskPending, useTask, useTaskActions } from '../hooks/useTasks';
import { isDone } from '../model/taskMeta';
import { reportMutationError } from '../utils/mutationFeedback';

type Props = TasksStackScreenProps<'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const styles = useStyles();
  const task = useTask(taskId);
  const pending = useIsTaskPending(taskId);
  const { toggleCompletion } = useTaskActions();

  if (!task) {
    return <TaskNotFound onBack={() => navigation.navigate('TaskList')} />;
  }

  const done = isDone(task);
  const overdue = !done && getDueStatus(task.dueDate) === 'overdue';

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.pills}>
          <StatusPill status={task.status} />
          <PriorityPill priority={task.priority} />
        </View>
        <AppText variant="title" accessibilityRole="header">
          {task.title}
        </AppText>

        <Card style={styles.description}>
          <AppText variant="label" color="textMuted">
            Description
          </AppText>
          <AppText>{task.description || 'No description yet.'}</AppText>
        </Card>

        <Card padded={false}>
          <DetailRow
            icon="user"
            label="Assignee"
            value={task.assignee}
            leading={<Avatar initials={getInitials(task.assignee)} size={28} />}
          />
          <DetailRow
            icon="calendar"
            label="Due"
            value={formatDate(task.dueDate)}
            caption={done ? undefined : describeDueDate(task.dueDate)}
            highlight={overdue}
          />
          <DetailRow icon="clock" label="Created" value={formatDate(task.createdAt)} last />
        </Card>
      </ScrollView>

      <ActionBar>
        <Button
          variant="secondary"
          label={done ? 'Reopen' : 'Mark done'}
          icon={done ? 'rotate-ccw' : 'check'}
          disabled={pending}
          onPress={() => toggleCompletion(task.id).catch(reportMutationError)}
          style={styles.flex}
        />
        <Button
          label="Edit"
          icon="edit-2"
          onPress={() => navigation.navigate('EditTask', { taskId: task.id })}
          style={styles.flex}
        />
      </ActionBar>
    </View>
  );
}

interface DetailRowProps {
  icon: IconName;
  label: string;
  value: string;
  caption?: string;
  /** Render the caption in the attention colour (e.g. overdue). */
  highlight?: boolean;
  leading?: React.ReactNode;
  last?: boolean;
}

function DetailRow({ icon, label, value, caption, highlight, leading, last }: DetailRowProps) {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <View
      style={[styles.row, !last && styles.rowDivider]}
      accessible
      accessibilityLabel={`${label}: ${value}${caption ? `, ${caption}` : ''}`}
    >
      <Icon name={icon} color={colors.textMuted} />
      <AppText variant="callout" color="textMuted" style={styles.flex}>
        {label}
      </AppText>
      {leading}
      <View style={styles.rowValue}>
        <AppText variant="callout" weight="semibold" align="right">
          {value}
        </AppText>
        {caption ? (
          <AppText
            variant="caption"
            align="right"
            style={{ color: highlight ? colors.accent : colors.textMuted }}
          >
            {caption}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { ...centeredContent, padding: spacing.lg, gap: spacing.lg },
  pills: { flexDirection: 'row', gap: spacing.sm },
  description: { gap: spacing.sm },
  flex: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowValue: { alignItems: 'flex-end' },
}));
