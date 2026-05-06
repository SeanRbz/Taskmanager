// ─────────────────────────────────────────────────────────────────────────────
// screens/TaskListScreen.tsx
//
// Requirements:
//   - Load tasks from your state management solution on mount
//   - Group tasks by status: 'todo', 'in_progress', 'done'
//   - Render a filter bar for priority: 'high' | 'medium' | 'low' | all
//   - Tapping a task navigates to TaskDetail with the task's id
//   - Marking a task complete must update the UI optimistically (before async resolves)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import * as Linking from 'expo-linking';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList, Task, TaskPriority, TaskStatus } from '@/types';
import { useTaskManager } from '@/hooks';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskList'>;

type PriorityFilter = TaskPriority | 'all';

const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];
const STATUS_LABEL: Record<TaskStatus, string> = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
const PRIORITIES: PriorityFilter[] = ['all', 'high', 'medium', 'low'];
const PRIORITY_COLOR: Record<TaskPriority, string> = { high: '#D32F2F', medium: '#F57C00', low: '#388E3C' };

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, completeTask } = useTaskManager();
  const [filter, setFilter] = useState<PriorityFilter>('all');

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.priority === filter);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
        {PRIORITIES.map((p: PriorityFilter) => (
          <TouchableOpacity
            key={p}
            style={[styles.filterChip, filter === p && styles.filterChipActive]}
            onPress={() => setFilter(p)}
          >
            <Text style={[styles.filterChipText, filter === p && styles.filterChipTextActive]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <FlatList
        data={STATUSES}
        keyExtractor={s => s}
        renderItem={({ item: status }) => {
          const group = filtered.filter(t => t.status === status);
          if (!group.length) return null;
          return (
            <View style={styles.group}>
              <Text style={styles.groupHeader}>{STATUS_LABEL[status]} ({group.length})</Text>
              {group.map(task => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })}
                  onComplete={() => completeTask(task.id)}
                />
              ))}
            </View>
          );
        }}
      />
    </View>
  );
}

function TaskRow({ task, onPress, onComplete }: { task: Task; onPress: () => void; onComplete: () => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <View style={[styles.priorityDot, { backgroundColor: PRIORITY_COLOR[task.priority] }]} />
        <View>
          <Text style={[styles.rowTitle, task.status === 'done' && styles.rowTitleDone]}>{task.title}</Text>
          <Text style={styles.rowMeta}>{task.assignee} · {task.dueDate}</Text>
        </View>
      </View>
      {task.status !== 'done' && (
        <TouchableOpacity style={styles.completeBtn} onPress={onComplete}>
          <Text style={styles.completeBtnText}>✓</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  filterBar: { maxHeight: 52, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#FFF' },
  filterContent: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 16, borderWidth: 1, borderColor: '#CCC', backgroundColor: '#FFF' },
  filterChipActive: { backgroundColor: '#1E3A5F', borderColor: '#1E3A5F' },
  filterChipText: { fontSize: 13, color: '#555' },
  filterChipTextActive: { color: '#FFF' },
  group: { marginTop: 16, paddingHorizontal: 16 },
  groupHeader: { fontSize: 13, fontWeight: '600', color: '#1E3A5F', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  priorityDot: { width: 10, height: 10, borderRadius: 5 },
  rowTitle: { fontSize: 14, fontWeight: '500', color: '#1A1A1A', flexShrink: 1 },
  rowTitleDone: { textDecorationLine: 'line-through', color: '#999' },
  rowMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  completeBtn: { marginLeft: 8, width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: '#1E3A5F', alignItems: 'center', justifyContent: 'center' },
  completeBtnText: { fontSize: 13, color: '#1E3A5F', fontWeight: '700' },
  devLink: { margin: 12, padding: 10, backgroundColor: '#FFF3CD', borderRadius: 8, alignItems: 'center' },
  devLinkText: { fontSize: 12, color: '#856404' },
});
