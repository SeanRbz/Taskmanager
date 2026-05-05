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

export default function ProfileScreen() {
  // TODO: Pull incomplete task count from your shared state solution

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>ProfileScreen — implement me</Text>
      <Text style={styles.hint}>{MOCK_USER.name} · {MOCK_USER.role}</Text>
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
