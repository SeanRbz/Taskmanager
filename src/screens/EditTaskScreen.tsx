// ─────────────────────────────────────────────────────────────────────────────
// screens/EditTaskScreen.tsx
//
// Requirements:
//   - Receive taskId via route.params
//   - Allow editing: title, description, priority, status
//   - On Save: update task in shared state, navigate back to TaskDetail
//     Changes must be reflected on TaskList immediately (no manual refresh)
//   - On Cancel: discard changes, navigate back without updating state
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList } from '@/types';

type Props = NativeStackScreenProps<TasksStackParamList, 'EditTask'>;

export default function EditTaskScreen({ route, navigation }: Props) {
  const { taskId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>EditTaskScreen — implement me</Text>
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
