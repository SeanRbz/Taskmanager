import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, SectionListData, SectionListRenderItem, View } from 'react-native';
import type { TasksStackScreenProps } from '@/navigation/types';
import { centeredContent, makeStyles, spacing } from '@/shared/theme';
import { Button, ChipGroup, ChipOption, EmptyState } from '@/shared/ui';
import { TaskCard } from '../components/TaskCard';
import { TaskSectionHeader } from '../components/TaskSectionHeader';
import { TaskSummaryCard } from '../components/TaskSummaryCard';
import {
  usePendingTasks,
  usePriorityCounts,
  useTaskActions,
  useTaskSections,
  useTaskStats,
} from '../hooks/useTasks';
import { PRIORITY_META, PRIORITY_ORDER } from '../model/taskMeta';
import type { PriorityFilter, Task } from '../model/types';
import type { TaskSection } from '../state/selectors';
import { reportMutationError } from '../utils/mutationFeedback';

type Props = TasksStackScreenProps<'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const styles = useStyles();
  const [filter, setFilter] = useState<PriorityFilter>('all');
  const sections = useTaskSections(filter);
  const counts = usePriorityCounts();
  const stats = useTaskStats();
  const pending = usePendingTasks();
  const { toggleCompletion } = useTaskActions();

  const filterOptions = useMemo<ChipOption<PriorityFilter>[]>(
    () => [
      { value: 'all', label: 'All', count: counts.all },
      ...PRIORITY_ORDER.map(priority => ({
        value: priority,
        label: PRIORITY_META[priority].label,
        icon: PRIORITY_META[priority].icon,
        count: counts[priority],
      })),
    ],
    [counts],
  );

  const openTask = useCallback(
    (taskId: string) => navigation.navigate('TaskDetail', { taskId }),
    [navigation],
  );

  // Optimistic: the card moves sections immediately; a failure rolls it back.
  const toggleTask = useCallback(
    (taskId: string) => {
      toggleCompletion(taskId).catch(reportMutationError);
    },
    [toggleCompletion],
  );

  const renderItem = useCallback<SectionListRenderItem<Task, TaskSection>>(
    ({ item }) => (
      <TaskCard
        task={item}
        pending={item.id in pending}
        onOpen={openTask}
        onToggle={toggleTask}
      />
    ),
    [pending, openTask, toggleTask],
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={ItemSeparator}
      stickySectionHeadersEnabled={false}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.list}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <TaskSummaryCard stats={stats} />
          <ChipGroup
            scrollable
            options={filterOptions}
            value={filter}
            onChange={setFilter}
            accessibilityLabel="Filter by priority"
          />
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          icon="inbox"
          title="No tasks here"
          message="Nothing matches this priority yet."
          action={
            <Button variant="secondary" label="Show all tasks" onPress={() => setFilter('all')} />
          }
        />
      }
    />
  );
}

const keyExtractor = (task: Task) => task.id;

const renderSectionHeader = ({ section }: { section: SectionListData<Task, TaskSection> }) => (
  <TaskSectionHeader status={section.status} count={section.data.length} />
);

function ItemSeparator() {
  return <View style={{ height: spacing.sm }} />;
}

const useStyles = makeStyles(({ colors }) => ({
  list: { flex: 1, backgroundColor: colors.background },
  content: { ...centeredContent, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.lg, paddingTop: spacing.sm },
}));
