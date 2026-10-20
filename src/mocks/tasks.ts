// Seed data for the demo. Dates are relative to the day the app starts so the
// list always shows a realistic mix of overdue, due-soon and upcoming work.
// Task IDs are stable: deep links such as taskmanager://task/task-001 rely on them.

import type { Task } from '@/features/tasks/model/types';
import { addDays, toISODate } from '@/shared/utils/date';

const today = new Date();
const daysFromToday = (days: number) => toISODate(addDays(today, days));

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    title: 'Refactor authentication module',
    description:
      'The current auth module mixes concerns between token storage, refresh logic, and session handling. Split into separate services and add unit tests for each.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: daysFromToday(1),
    createdAt: daysFromToday(-20),
  },
  {
    id: 'task-002',
    title: 'Write API integration tests for /orders endpoint',
    description:
      'Cover all HTTP methods (GET, POST, PATCH, DELETE) with both happy-path and error scenarios. Use the existing MSW setup in the test suite.',
    status: 'todo',
    priority: 'high',
    assignee: 'Sam Rivera',
    dueDate: daysFromToday(3),
    createdAt: daysFromToday(-12),
  },
  {
    id: 'task-003',
    title: 'Update onboarding flow copy',
    description:
      'Marketing has provided revised copy for steps 2 and 4 of the onboarding flow. Replace existing strings and ensure translations are updated in all four supported locales.',
    status: 'todo',
    priority: 'low',
    assignee: 'Jordan Lee',
    dueDate: daysFromToday(12),
    createdAt: daysFromToday(-10),
  },
  {
    id: 'task-004',
    title: 'Investigate memory leak in FlatList component',
    description:
      'Users are reporting sluggishness after extended scrolling sessions. Profiler output suggests event listeners are not being cleaned up on unmount. Investigate and fix.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: daysFromToday(-1),
    createdAt: daysFromToday(-9),
  },
  {
    id: 'task-005',
    title: 'Add pull-to-refresh to dashboard screen',
    description:
      'The dashboard currently requires manual navigation away and back to refresh data. Implement pull-to-refresh using the RefreshControl component.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Sam Rivera',
    dueDate: daysFromToday(6),
    createdAt: daysFromToday(-8),
  },
  {
    id: 'task-006',
    title: 'Migrate from Redux to Zustand',
    description:
      'Scope and execute migration of global state from Redux Toolkit to Zustand. Maintain identical external behaviour. Document any API surface changes for dependent teams.',
    status: 'done',
    priority: 'medium',
    assignee: 'Jordan Lee',
    dueDate: daysFromToday(-7),
    createdAt: daysFromToday(-30),
  },
  {
    id: 'task-007',
    title: 'Set up error boundary for root navigator',
    description:
      'Unhandled JS errors currently crash the app without any recovery path. Add a top-level error boundary that logs to Sentry and shows a user-friendly fallback screen.',
    status: 'done',
    priority: 'high',
    assignee: 'Alex Johnson',
    dueDate: daysFromToday(-10),
    createdAt: daysFromToday(-25),
  },
  {
    id: 'task-008',
    title: 'Implement dark mode support',
    description:
      'Use the useColorScheme hook and a custom theme context to support system-level dark mode. All existing screens must respond correctly to theme changes.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Sam Rivera',
    dueDate: daysFromToday(20),
    createdAt: daysFromToday(-6),
  },
  {
    id: 'task-009',
    title: 'Audit and fix accessibility labels',
    description:
      'Run VoiceOver and TalkBack across all primary screens. Add missing accessibilityLabel, accessibilityHint, and accessibilityRole props. Target WCAG 2.1 AA compliance.',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Jordan Lee',
    dueDate: daysFromToday(0),
    createdAt: daysFromToday(-5),
  },
  {
    id: 'task-010',
    title: 'Document component library in Storybook',
    description:
      'Add Storybook stories for all shared components in src/components. Each story should cover default state, loading state, and error state where applicable.',
    status: 'done',
    priority: 'low',
    assignee: 'Alex Johnson',
    dueDate: daysFromToday(-4),
    createdAt: daysFromToday(-20),
  },
];
