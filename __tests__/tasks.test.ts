// ─────────────────────────────────────────────────────────────────────────────
// __tests__/tasks.test.ts — Example test file
//
// BONUS: Write at least one integration or unit test covering a state transition.
// Examples of good tests for this assessment:
//
//   - Completing a task updates its status to 'done' in state
//   - Completing a task decrements the incomplete count
//   - Editing a task title is reflected when reading the task back by id
//   - Optimistic update rolls back correctly on simulated failure
//
// Run with: npm test
// ─────────────────────────────────────────────────────────────────────────────

import { store, completeTask, rollbackTask } from '../src/state';
import { Task } from '../src/types';

describe('Task state', () => {
  it('completing a task sets its status to done', () => {
    // Arrange
    const target = store.getState().tasks.tasks.find((t: Task) => t.status !== 'done')!;

    // Act
    store.dispatch(completeTask(target.id));

    // Assert
    const updated = store.getState().tasks.tasks.find((t: Task) => t.id === target.id);
    expect(updated?.status).toBe('done');
  });

  it.todo('completing a task decrements the incomplete task count');
  it.todo('editing a task title is reflected when reading back by id');

  it('optimistic update rolls back correctly on simulated failure', () => {
    // Arrange
    const target = store.getState().tasks.tasks.find((t: Task) => t.status !== 'done')!;
    const previousStatus = target.status;

    // Act — optimistic complete, then simulate failure by rolling back
    store.dispatch(completeTask(target.id));
    store.dispatch(rollbackTask({ id: target.id, previousStatus }));

    // Assert
    const reverted = store.getState().tasks.tasks.find((t: Task) => t.id === target.id);
    expect(reverted?.status).toBe(previousStatus);
  });
});
