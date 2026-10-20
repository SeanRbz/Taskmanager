import { TITLE_MAX_LENGTH } from './taskMeta';
import type { Task, TaskDraft } from './types';

export function toTaskDraft({ title, description, priority, status }: Task): TaskDraft {
  return { title, description, priority, status };
}

export interface TaskDraftErrors {
  title?: string;
}

export function validateTaskDraft(draft: TaskDraft): TaskDraftErrors {
  const title = draft.title.trim();
  if (!title) return { title: 'Title is required' };
  if (title.length > TITLE_MAX_LENGTH) {
    return { title: `Title must be ${TITLE_MAX_LENGTH} characters or fewer` };
  }
  return {};
}

export function normalizeTaskDraft(draft: TaskDraft): TaskDraft {
  return { ...draft, title: draft.title.trim(), description: draft.description.trim() };
}
