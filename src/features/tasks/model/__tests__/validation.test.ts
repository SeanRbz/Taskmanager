import { TITLE_MAX_LENGTH } from '../taskMeta';
import type { TaskDraft } from '../types';
import { normalizeTaskDraft, validateTaskDraft } from '../validation';

const draft = (overrides: Partial<TaskDraft> = {}): TaskDraft => ({
  title: 'Ship the release',
  description: '',
  priority: 'medium',
  status: 'todo',
  ...overrides,
});

describe('validateTaskDraft', () => {
  it('accepts a valid draft', () => {
    expect(validateTaskDraft(draft())).toEqual({});
  });

  it('requires a non-blank title', () => {
    expect(validateTaskDraft(draft({ title: '   ' })).title).toBe('Title is required');
  });

  it('limits the title length', () => {
    const title = 'x'.repeat(TITLE_MAX_LENGTH + 1);
    expect(validateTaskDraft(draft({ title })).title).toMatch(/characters or fewer/);
  });
});

describe('normalizeTaskDraft', () => {
  it('trims the title and description', () => {
    expect(normalizeTaskDraft(draft({ title: '  Ship  ', description: ' notes ' }))).toMatchObject({
      title: 'Ship',
      description: 'notes',
    });
  });
});
