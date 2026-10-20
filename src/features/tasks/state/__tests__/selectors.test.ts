import { makeStore } from '@/store';
import { createDeferredTasksApi } from '@/test/fakeTasksApi';
import { buildTask } from '@/test/fixtures';
import {
  selectIncompleteCount,
  selectOpenTasksFor,
  selectPriorityCounts,
  selectTaskSections,
  selectTaskStats,
} from '../selectors';
import { createTasksState, toggleTaskCompletion } from '../tasksSlice';

const TASKS = [
  buildTask({ id: 'a', status: 'todo', priority: 'high', dueDate: '2026-05-03', assignee: 'Alex' }),
  buildTask({ id: 'b', status: 'todo', priority: 'low', dueDate: '2026-05-01', assignee: 'Sam' }),
  buildTask({ id: 'c', status: 'in_progress', priority: 'medium', assignee: 'Alex' }),
  buildTask({ id: 'd', status: 'done', priority: 'high', assignee: 'Alex' }),
];

const state = { tasks: createTasksState(TASKS) };

describe('selectTaskSections', () => {
  it('groups tasks by status in workflow order, soonest due first', () => {
    // Act
    const sections = selectTaskSections(state, 'all');

    // Assert
    expect(sections.map(section => section.status)).toEqual(['todo', 'in_progress', 'done']);
    expect(sections[0].data.map(task => task.id)).toEqual(['b', 'a']);
  });

  it('filters by priority and omits groups left empty', () => {
    // Act
    const sections = selectTaskSections(state, 'high');

    // Assert
    expect(sections.map(section => section.status)).toEqual(['todo', 'done']);
    expect(sections.flatMap(section => section.data).every(task => task.priority === 'high')).toBe(
      true,
    );
  });

  it('returns the same reference for unchanged input (memoised)', () => {
    expect(selectTaskSections(state, 'low')).toBe(selectTaskSections(state, 'low'));
  });
});

describe('counts and stats', () => {
  it('counts incomplete tasks and tasks per priority', () => {
    expect(selectIncompleteCount(state)).toBe(3);
    expect(selectPriorityCounts(state)).toEqual({ all: 4, high: 2, medium: 1, low: 1 });
  });

  it('decrements the incomplete count as soon as a task is completed', () => {
    // Arrange
    const store = makeStore({ tasks: TASKS, tasksApi: createDeferredTasksApi().api });
    const before = selectIncompleteCount(store.getState());

    // Act
    store.dispatch(toggleTaskCompletion('a'));

    // Assert
    expect(selectIncompleteCount(store.getState())).toBe(before - 1);
  });

  it('scopes stats to an assignee', () => {
    expect(selectTaskStats(state, 'Alex')).toEqual({
      total: 3,
      todo: 1,
      inProgress: 1,
      done: 1,
      open: 2,
      completion: 1 / 3,
    });
  });

  it("lists an assignee's open tasks", () => {
    expect(selectOpenTasksFor(state, 'Alex').map(task => task.id)).toEqual(['c', 'a']);
  });
});
