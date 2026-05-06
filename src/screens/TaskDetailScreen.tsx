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
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList, TaskPriority, TaskStatus } from '@/types';
import { useTaskManager } from '@/hooks';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskDetail'>;

const PRIORITY_COLOR: Record<TaskPriority, string> = { high: '#D32F2F', medium: '#F57C00', low: '#388E3C' };
const STATUS_LABEL: Record<TaskStatus, string> = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { getTaskById } = useTaskManager();
  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.missing}>Task not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{task.title}</Text>

      <View style={styles.badges}>
        <View style={[styles.badge, { backgroundColor: PRIORITY_COLOR[task.priority] }]}>
          <Text style={styles.badgeText}>{task.priority.toUpperCase()}</Text>
        </View>
        <View style={styles.badgeOutline}>
          <Text style={styles.badgeOutlineText}>{STATUS_LABEL[task.status]}</Text>
        </View>
      </View>

      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.meta}>
        <Field label="Assignee" value={task.assignee} />
        <Field label="Due Date" value={task.dueDate} />
        <Field label="Created" value={task.createdAt} />
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditTask', { taskId })}>
        <Text style={styles.editBtnText}>Edit Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missing: { color: '#999', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  badges: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  badgeOutline: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#1E3A5F' },
  badgeOutlineText: { color: '#1E3A5F', fontSize: 11, fontWeight: '600' },
  description: { fontSize: 14, color: '#444', lineHeight: 22, marginBottom: 24 },
  meta: { gap: 12, marginBottom: 32 },
  field: { flexDirection: 'row', justifyContent: 'space-between' },
  fieldLabel: { fontSize: 13, color: '#888' },
  fieldValue: { fontSize: 13, color: '#1A1A1A', fontWeight: '500' },
  editBtn: { backgroundColor: '#1E3A5F', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  editBtnText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
});
