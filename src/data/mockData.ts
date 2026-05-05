// ─────────────────────────────────────────────────────────────────────────────
// mockData.ts — Sample data for the Task Manager assessment
//
// This data is provided as a starting point. You should load this into your
// state management solution on app start. Do not modify the task IDs —
// they are used by the deep linking tests.
// ─────────────────────────────────────────────────────────────────────────────

import { Task, User } from '@/types';

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    title: 'Refactor authentication module',
    description:
      'The current auth module mixes concerns between token storage, refresh logic, and session handling. Split into separate services and add unit tests for each.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: '2026-03-28',
    createdAt: '2026-03-01',
  },
  {
    id: 'task-002',
    title: 'Write API integration tests for /orders endpoint',
    description:
      'Cover all HTTP methods (GET, POST, PATCH, DELETE) with both happy-path and error scenarios. Use the existing MSW setup in the test suite.',
    status: 'todo',
    priority: 'high',
    assignee: 'Sam Rivera',
    dueDate: '2026-04-02',
    createdAt: '2026-03-05',
  },
  {
    id: 'task-003',
    title: 'Update onboarding flow copy',
    description:
      'Marketing has provided revised copy for steps 2 and 4 of the onboarding flow. Replace existing strings and ensure translations are updated in all four supported locales.',
    status: 'todo',
    priority: 'low',
    assignee: 'Jordan Lee',
    dueDate: '2026-04-10',
    createdAt: '2026-03-06',
  },
  {
    id: 'task-004',
    title: 'Investigate memory leak in FlatList component',
    description:
      'Users are reporting sluggishness after extended scrolling sessions. Profiler output suggests event listeners are not being cleaned up on unmount. Investigate and fix.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: '2026-03-25',
    createdAt: '2026-03-08',
  },
  {
    id: 'task-005',
    title: 'Add pull-to-refresh to dashboard screen',
    description:
      'The dashboard currently requires manual navigation away and back to refresh data. Implement pull-to-refresh using the RefreshControl component.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Sam Rivera',
    dueDate: '2026-04-05',
    createdAt: '2026-03-09',
  },
  {
    id: 'task-006',
    title: 'Migrate from Redux to Zustand',
    description:
      'Scope and execute migration of global state from Redux Toolkit to Zustand. Maintain identical external behaviour. Document any API surface changes for dependent teams.',
    status: 'done',
    priority: 'medium',
    assignee: 'Jordan Lee',
    dueDate: '2026-03-15',
    createdAt: '2026-02-20',
  },
  {
    id: 'task-007',
    title: 'Set up error boundary for root navigator',
    description:
      'Unhandled JS errors currently crash the app without any recovery path. Add a top-level error boundary that logs to Sentry and shows a user-friendly fallback screen.',
    status: 'done',
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: '2026-03-10',
    createdAt: '2026-02-25',
  },
  {
    id: 'task-008',
    title: 'Implement dark mode support',
    description:
      'Use the useColorScheme hook and a custom theme context to support system-level dark mode. All existing screens must respond correctly to theme changes.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Sam Rivera',
    dueDate: '2026-04-20',
    createdAt: '2026-03-10',
  },
  {
    id: 'task-009',
    title: 'Audit and fix accessibility labels',
    description:
      'Run VoiceOver and TalkBack across all primary screens. Add missing accessibilityLabel, accessibilityHint, and accessibilityRole props. Target WCAG 2.1 AA compliance.',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Jordan Lee',
    dueDate: '2026-04-01',
    createdAt: '2026-03-11',
  },
  {
    id: 'task-010',
    title: 'Document component library in Storybook',
    description:
      'Add Storybook stories for all shared components in src/components. Each story should cover default state, loading state, and error state where applicable.',
    status: 'done',
    priority: 'low',
    assignee: 'Alex Johnson',
    dueDate: '2026-03-20',
    createdAt: '2026-03-01',
  },
];

export const MOCK_USER: User = {
  id: 'user-001',
  name: 'Alex Johnson',
  role: 'Senior React Native Engineer',
  avatarInitials: 'AJ',
};
