// ─────────────────────────────────────────────────────────────────────────────
// screens/TaskDetailScreen.tsx
//
// Requirements:
//   - Receive taskId via route.params
//   - Display all task fields: title, description, priority, status, assignee, dueDate
//   - Button to navigate to EditTask screen, passing taskId
//   - Back button (handled by React Navigation header) returns to TaskList
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList } from '@/types';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>TaskDetailScreen — implement me</Text>
      <Text style={styles.hint}>taskId: {taskId}</Text>
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
  hint: {
    fontSize: 13,
    color: '#BBB',
    marginTop: 8,
  },
});
