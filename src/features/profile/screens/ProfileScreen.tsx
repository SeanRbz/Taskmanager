import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useOpenTasksFor, useTaskStats } from '@/features/tasks/hooks/useTasks';
import type { RootTabScreenProps } from '@/navigation/types';
import { centeredContent, makeStyles, spacing } from '@/shared/theme';
import { AppText, Avatar, Card, EmptyState, ProgressBar, StatTile } from '@/shared/ui';
import { UpNextRow } from '../components/UpNextRow';
import { useCurrentUser } from '../hooks/useCurrentUser';

const UP_NEXT_LIMIT = 3;

type Props = RootTabScreenProps<'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const styles = useStyles();
  const user = useCurrentUser();
  // Shared store: these update live as tasks are completed on the Tasks tab.
  const stats = useTaskStats(user.name);
  const openTasks = useOpenTasksFor(user.name);
  const upNext = openTasks.slice(0, UP_NEXT_LIMIT);

  const openTask = useCallback(
    (taskId: string) =>
      // `initial: false` keeps TaskList underneath so Back works from the detail screen.
      navigation.navigate('Tasks', { screen: 'TaskDetail', params: { taskId }, initial: false }),
    [navigation],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.identity}>
        <Avatar initials={user.avatarInitials} size={80} />
        <View style={styles.identityText}>
          <AppText variant="title" align="center" accessibilityRole="header">
            {user.name}
          </AppText>
          <AppText color="textMuted" align="center">
            {user.role}
          </AppText>
        </View>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow} accessibilityLiveRegion="polite">
          <StatTile value={stats.open} label={stats.open === 1 ? 'Open task' : 'Open tasks'} emphasis />
          <StatTile value={stats.inProgress} label="In progress" />
          <StatTile value={stats.done} label="Completed" />
        </View>
        <ProgressBar value={stats.completion} accessibilityLabel="Your completion rate" />
        <AppText variant="caption" color="textMuted">
          {stats.done} of {stats.total} assigned tasks completed
        </AppText>
      </Card>

      <View style={styles.sectionHeader}>
        <AppText variant="heading" accessibilityRole="header">
          Up next
        </AppText>
        {openTasks.length > UP_NEXT_LIMIT ? (
          <AppText variant="caption" color="textMuted">
            +{openTasks.length - UP_NEXT_LIMIT} more
          </AppText>
        ) : null}
      </View>

      {upNext.length === 0 ? (
        <Card>
          <EmptyState
            icon="coffee"
            title="You're all caught up"
            message="No open tasks are assigned to you."
          />
        </Card>
      ) : (
        <Card padded={false}>
          {upNext.map((task, index) => (
            <UpNextRow
              key={task.id}
              task={task}
              last={index === upNext.length - 1}
              onPress={openTask}
            />
          ))}
        </Card>
      )}
    </ScrollView>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { ...centeredContent, padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  identity: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  identityText: { gap: spacing.xxs },
  statsCard: { gap: spacing.md },
  // Bottom-aligned so labels share a baseline despite the larger headline number.
  statsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
}));
