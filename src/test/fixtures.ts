import type { Task } from '@/features/tasks/model/types';

let sequence = 0;

/** Builds a valid task with deterministic dates; override only what a test cares about. */
export function buildTask(overrides: Partial<Task> = {}): Task {
  sequence += 1;
  return {
    id: `task-${sequence}`,
    title: `Task ${sequence}`,
    description: 'A task used in tests.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Alex Johnson',
    dueDate: '2026-04-20',
    createdAt: '2026-04-01',
    ...overrides,
  };
}
