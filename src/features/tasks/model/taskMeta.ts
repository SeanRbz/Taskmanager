import type { ToneName } from '@/shared/theme';
import type { IconName } from '@/shared/ui';
import type { Task, TaskPriority, TaskStatus } from './types';

interface DisplayMeta {
  label: string;
  icon: IconName;
  tone: ToneName;
}

export const STATUS_ORDER: readonly TaskStatus[] = ['todo', 'in_progress', 'done'];

export const PRIORITY_ORDER: readonly TaskPriority[] = ['high', 'medium', 'low'];

export const STATUS_META: Record<TaskStatus, DisplayMeta> = {
  todo: { label: 'To do', icon: 'circle', tone: 'neutral' },
  in_progress: { label: 'In progress', icon: 'clock', tone: 'primary' },
  done: { label: 'Done', icon: 'check-circle', tone: 'success' },
};

export const PRIORITY_META: Record<TaskPriority, DisplayMeta> = {
  high: { label: 'High', icon: 'chevrons-up', tone: 'danger' },
  medium: { label: 'Medium', icon: 'chevron-up', tone: 'warning' },
  low: { label: 'Low', icon: 'chevron-down', tone: 'neutral' },
};

export const TITLE_MAX_LENGTH = 120;

export function isDone(task: Pick<Task, 'status'>): boolean {
  return task.status === 'done';
}
