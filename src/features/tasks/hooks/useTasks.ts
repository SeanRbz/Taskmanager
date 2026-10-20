import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { confirmTap } from '@/shared/utils/haptics';
import type { PriorityFilter, Task } from '../model/types';
import {
  selectIncompleteCount,
  selectIsTaskPending,
  selectOpenTasksFor,
  selectPriorityCounts,
  selectTaskById,
  selectTaskSections,
  selectTaskStats,
} from '../state/selectors';
import { saveTask, toggleTaskCompletion } from '../state/tasksSlice';

// Narrow hooks so each component subscribes only to the slice of state it renders.

export function useTask(id: string): Task | undefined {
  return useAppSelector(state => selectTaskById(state, id));
}

export function useIsTaskPending(id: string): boolean {
  return useAppSelector(state => selectIsTaskPending(state, id));
}

export function usePendingTasks(): Record<string, Task> {
  return useAppSelector(state => state.tasks.pending);
}

export function useTaskSections(filter: PriorityFilter) {
  return useAppSelector(state => selectTaskSections(state, filter));
}

export function usePriorityCounts() {
  return useAppSelector(selectPriorityCounts);
}

export function useIncompleteCount(): number {
  return useAppSelector(selectIncompleteCount);
}

export function useTaskStats(assignee?: string) {
  return useAppSelector(state => selectTaskStats(state, assignee));
}

export function useOpenTasksFor(assignee: string) {
  return useAppSelector(state => selectOpenTasksFor(state, assignee));
}

/** Mutations. Each resolves with the saved task or rejects after rolling back. */
export function useTaskActions() {
  const dispatch = useAppDispatch();

  const toggleCompletion = useCallback(
    (id: string) => {
      confirmTap();
      return dispatch(toggleTaskCompletion(id)).unwrap();
    },
    [dispatch],
  );

  const save = useCallback((task: Task) => dispatch(saveTask(task)).unwrap(), [dispatch]);

  return useMemo(() => ({ toggleCompletion, saveTask: save }), [toggleCompletion, save]);
}
