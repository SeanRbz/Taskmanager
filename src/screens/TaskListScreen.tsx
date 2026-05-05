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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList } from '@/types';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>TaskListScreen — implement me</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});
