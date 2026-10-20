export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'high' | 'medium' | 'low';

export type PriorityFilter = TaskPriority | 'all';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string; // ISO calendar date, e.g. "2026-04-15"
  createdAt: string; // ISO calendar date
}

/** The subset of a task editable from the Edit screen. */
export type TaskDraft = Pick<Task, 'title' | 'description' | 'priority' | 'status'>;
