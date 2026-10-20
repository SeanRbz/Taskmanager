import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { TasksApi } from '../api/tasksApi';
import type { Task } from '../model/types';

export const tasksAdapter = createEntityAdapter<Task>();

export interface TasksState extends EntityState<Task, string> {
  /** Pre-mutation snapshots of tasks with a request in flight, used for rollback. */
  pending: Record<string, Task>;
}

export interface TasksRootState {
  tasks: TasksState;
}

export interface TasksThunkExtra {
  tasksApi: TasksApi;
}

interface ThunkConfig {
  state: TasksRootState;
  extra: TasksThunkExtra;
}

export function createTasksState(tasks: Task[] = []): TasksState {
  return tasksAdapter.setAll(tasksAdapter.getInitialState({ pending: {} }), tasks);
}

// One mutation per task at a time keeps rollback snapshots unambiguous.
function canMutate(id: string, { tasks }: TasksRootState): boolean {
  return id in tasks.entities && !(id in tasks.pending);
}

/**
 * Flips a task between done and to-do. The `pending` reducer applies the change
 * immediately (optimistic UI); `rejected` restores the snapshot if the request fails.
 */
export const toggleTaskCompletion = createAsyncThunk<Task, string, ThunkConfig>(
  'tasks/toggleCompletion',
  async (id, { getState, extra }) => extra.tasksApi.updateTask(getState().tasks.entities[id]),
  { condition: (id, { getState }) => canMutate(id, getState()) },
);

/** Persists an edited task with the same optimistic update and rollback as toggling. */
export const saveTask = createAsyncThunk<Task, Task, ThunkConfig>(
  'tasks/save',
  async (task, { extra }) => extra.tasksApi.updateTask(task),
  { condition: (task, { getState }) => canMutate(task.id, getState()) },
);

function snapshot(state: TasksState, id: string): void {
  state.pending[id] = { ...state.entities[id] };
}

function commit(state: TasksState, { payload }: PayloadAction<Task>): void {
  delete state.pending[payload.id];
  tasksAdapter.setOne(state, payload);
}

function rollback(state: TasksState, id: string): void {
  const previous = state.pending[id];
  if (!previous) return;
  tasksAdapter.setOne(state, previous);
  delete state.pending[id];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: createTasksState(),
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(toggleTaskCompletion.pending, (state, { meta }) => {
        snapshot(state, meta.arg);
        const task = state.entities[meta.arg];
        task.status = task.status === 'done' ? 'todo' : 'done';
      })
      .addCase(saveTask.pending, (state, { meta }) => {
        snapshot(state, meta.arg.id);
        tasksAdapter.setOne(state, meta.arg);
      })
      .addCase(toggleTaskCompletion.fulfilled, commit)
      .addCase(saveTask.fulfilled, commit)
      .addCase(toggleTaskCompletion.rejected, (state, { meta }) => rollback(state, meta.arg))
      .addCase(saveTask.rejected, (state, { meta }) => rollback(state, meta.arg.id));
  },
});

export const tasksReducer = tasksSlice.reducer;
