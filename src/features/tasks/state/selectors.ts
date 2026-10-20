import { createSelector } from '@reduxjs/toolkit';
import { PRIORITY_ORDER, STATUS_ORDER } from '../model/taskMeta';
import type { PriorityFilter, Task, TaskStatus } from '../model/types';
import { tasksAdapter, TasksRootState } from './tasksSlice';

export const { selectAll: selectAllTasks, selectById: selectTaskById } = tasksAdapter.getSelectors(
  (state: TasksRootState) => state.tasks,
);

export const selectIsTaskPending = (state: TasksRootState, id: string): boolean =>
  id in state.tasks.pending;

/** Drives the Tasks tab badge. */
export const selectIncompleteCount = createSelector(
  [selectAllTasks],
  tasks => tasks.filter(task => task.status !== 'done').length,
);

export interface TaskSection {
  status: TaskStatus;
  data: Task[];
}

/** Soonest due first; equal dates fall back to priority. */
function compareTasks(a: Task, b: Task): number {
  return (
    a.dueDate.localeCompare(b.dueDate) ||
    PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)
  );
}

/** Tasks grouped by status (in workflow order), filtered by priority. Empty groups are omitted. */
export const selectTaskSections = createSelector(
  [selectAllTasks, (_state: TasksRootState, filter: PriorityFilter) => filter],
  (tasks, filter): TaskSection[] => {
    const visible = filter === 'all' ? tasks : tasks.filter(task => task.priority === filter);
    return STATUS_ORDER.map(status => ({
      status,
      data: visible.filter(task => task.status === status).sort(compareTasks),
    })).filter(section => section.data.length > 0);
  },
);

export const selectPriorityCounts = createSelector([selectAllTasks], tasks => {
  const counts: Record<PriorityFilter, number> = { all: tasks.length, high: 0, medium: 0, low: 0 };
  tasks.forEach(task => {
    counts[task.priority] += 1;
  });
  return counts;
});

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  open: number;
  /** Fraction of tasks done, 0–1. */
  completion: number;
}

/** Status breakdown for every task, or only those assigned to `assignee`. */
export const selectTaskStats = createSelector(
  [selectAllTasks, (_state: TasksRootState, assignee?: string) => assignee],
  (tasks, assignee): TaskStats => {
    const scoped = assignee ? tasks.filter(task => task.assignee === assignee) : tasks;
    const count = (status: TaskStatus) => scoped.filter(task => task.status === status).length;
    const done = count('done');
    return {
      total: scoped.length,
      todo: count('todo'),
      inProgress: count('in_progress'),
      done,
      open: scoped.length - done,
      completion: scoped.length === 0 ? 0 : done / scoped.length,
    };
  },
);

/** The assignee's open tasks, soonest due first. */
export const selectOpenTasksFor = createSelector(
  [selectAllTasks, (_state: TasksRootState, assignee: string) => assignee],
  (tasks, assignee) =>
    tasks.filter(task => task.assignee === assignee && task.status !== 'done').sort(compareTasks),
);
