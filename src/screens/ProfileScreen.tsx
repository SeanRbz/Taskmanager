// ─────────────────────────────────────────────────────────────────────────────
// screens/ProfileScreen.tsx
//
// Requirements:
//   - Display MOCK_USER name, role, and avatarInitials
//   - Show a count of the current user's incomplete tasks
//     This count must come from your shared state — it should update in real
//     time as tasks are completed on the TaskList screen
// ─────────────────────────────────────────────────────────────────────────────


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MOCK_USER } from '@/data/mockData';
import { useTaskManager } from '@/hooks';

export default function ProfileScreen() {
  const { tasks } = useTaskManager();
  const incompleteCount = tasks.filter(
    t => t.assignee === MOCK_USER.name && t.status !== 'done'
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{MOCK_USER.avatarInitials}</Text>
      </View>
      <Text style={styles.name}>{MOCK_USER.name}</Text>
      <Text style={styles.role}>{MOCK_USER.role}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeCount}>{incompleteCount}</Text>
        <Text style={styles.badgeLabel}>incomplete task{incompleteCount !== 1 ? 's' : ''}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA', gap: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#1E3A5F', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  avatarText: { fontSize: 26, fontWeight: '700', color: '#FFF' },
  name: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  role: { fontSize: 14, color: '#666' },
  badge: { marginTop: 16, alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  badgeCount: { fontSize: 36, fontWeight: '700', color: '#1E3A5F' },
  badgeLabel: { fontSize: 13, color: '#888', marginTop: 2 },
});
