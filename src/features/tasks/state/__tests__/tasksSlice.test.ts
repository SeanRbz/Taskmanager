import { makeStore } from '@/store';
import { createDeferredTasksApi } from '@/test/fakeTasksApi';
import { buildTask } from '@/test/fixtures';
import { selectIsTaskPending, selectTaskById } from '../selectors';
import { saveTask, toggleTaskCompletion } from '../tasksSlice';

function setup() {
  const fake = createDeferredTasksApi();
  const store = makeStore({
    tasks: [
      buildTask({ id: 'todo-task', status: 'todo' }),
      buildTask({ id: 'active-task', status: 'in_progress' }),
      buildTask({ id: 'done-task', status: 'done' }),
    ],
    tasksApi: fake.api,
  });
  const statusOf = (id: string) => selectTaskById(store.getState(), id)?.status;
  const isPending = (id: string) => selectIsTaskPending(store.getState(), id);
  return { store, fake, statusOf, isPending };
}

describe('toggleTaskCompletion', () => {
  it('marks the task done before the request resolves (optimistic update)', () => {
    // Arrange
    const { store, statusOf, isPending } = setup();

    // Act
    store.dispatch(toggleTaskCompletion('todo-task'));

    // Assert
    expect(statusOf('todo-task')).toBe('done');
    expect(isPending('todo-task')).toBe(true);
  });

  it('keeps the change once the request succeeds', async () => {
    // Arrange
    const { store, fake, statusOf, isPending } = setup();

    // Act
    const request = store.dispatch(toggleTaskCompletion('todo-task'));
    fake.resolveNext();
    await request;

    // Assert
    expect(statusOf('todo-task')).toBe('done');
    expect(isPending('todo-task')).toBe(false);
  });

  it('reopens a completed task as to-do', () => {
    // Arrange
    const { store, statusOf } = setup();

    // Act
    store.dispatch(toggleTaskCompletion('done-task'));

    // Assert
    expect(statusOf('done-task')).toBe('todo');
  });

  it('rolls back to the previous status when the request fails', async () => {
    // Arrange
    const { store, fake, statusOf, isPending } = setup();

    // Act
    const request = store.dispatch(toggleTaskCompletion('active-task'));
    fake.rejectNext(new Error('offline'));

    // Assert
    await expect(request.unwrap()).rejects.toMatchObject({ message: 'offline' });
    expect(statusOf('active-task')).toBe('in_progress');
    expect(isPending('active-task')).toBe(false);
  });

  it('ignores a second toggle while the first is still in flight', () => {
    // Arrange
    const { store, fake, statusOf } = setup();

    // Act
    store.dispatch(toggleTaskCompletion('todo-task'));
    store.dispatch(toggleTaskCompletion('todo-task'));

    // Assert
    expect(fake.requests).toHaveLength(1);
    expect(statusOf('todo-task')).toBe('done');
  });

  it('does nothing for an unknown task id', () => {
    // Arrange
    const { store, fake } = setup();
    const before = store.getState();

    // Act
    store.dispatch(toggleTaskCompletion('missing'));

    // Assert
    expect(fake.requests).toHaveLength(0);
    expect(store.getState()).toBe(before);
  });
});

describe('saveTask', () => {
  it('applies edits immediately so they read back by id', () => {
    // Arrange
    const { store } = setup();
    const original = selectTaskById(store.getState(), 'todo-task')!;

    // Act
    store.dispatch(saveTask({ ...original, title: 'Renamed', priority: 'high' }));

    // Assert
    expect(selectTaskById(store.getState(), 'todo-task')).toMatchObject({
      title: 'Renamed',
      priority: 'high',
    });
  });

  it('restores the original task when the save fails', async () => {
    // Arrange
    const { store, fake } = setup();
    const original = selectTaskById(store.getState(), 'todo-task')!;

    // Act
    const request = store.dispatch(saveTask({ ...original, title: 'Renamed' }));
    fake.rejectNext();
    await request;

    // Assert
    expect(selectTaskById(store.getState(), 'todo-task')).toEqual(original);
  });
});
