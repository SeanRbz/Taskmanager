import React from 'react';
import { View } from 'react-native';
import { makeStyles, spacing } from '@/shared/theme';
import { AppText, Card, ProgressBar, StatTile } from '@/shared/ui';
import { pluralize } from '@/shared/utils/text';
import type { TaskStats } from '../state/selectors';

export function TaskSummaryCard({ stats }: { stats: TaskStats }) {
  const styles = useStyles();
  const percent = Math.round(stats.completion * 100);

  return (
    <Card style={styles.card}>
      <View style={styles.headline}>
        <View style={styles.headlineText}>
          <AppText variant="label" color="textMuted">
            Team progress
          </AppText>
          <AppText variant="heading">
            {stats.done} of {pluralize(stats.total, 'task')} done
          </AppText>
        </View>
        <AppText variant="title" color="primary">
          {percent}%
        </AppText>
      </View>
      <ProgressBar value={stats.completion} accessibilityLabel="Team progress" />
      <View style={styles.stats}>
        <StatTile value={stats.todo} label="To do" />
        <StatTile value={stats.inProgress} label="In progress" />
        <StatTile value={stats.done} label="Done" />
      </View>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  card: { gap: spacing.md },
  headline: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md },
  headlineText: { flex: 1, gap: spacing.xxs },
  stats: { flexDirection: 'row', gap: spacing.md },
}));
