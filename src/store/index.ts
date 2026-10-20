import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { env } from '@/config/env';
import { createMockTasksApi, TasksApi } from '@/features/tasks/api/tasksApi';
import type { Task } from '@/features/tasks/model/types';
import {
  createTasksState,
  tasksReducer,
  TasksThunkExtra,
} from '@/features/tasks/state/tasksSlice';
import { MOCK_TASKS } from '@/mocks/tasks';

const rootReducer = combineReducers({ tasks: tasksReducer });

export type RootState = ReturnType<typeof rootReducer>;

interface StoreOptions {
  /** Seed data; defaults to the bundled mock tasks. */
  tasks?: Task[];
  /** Injected into thunks as `extra.tasksApi` — tests pass a controllable fake. */
  tasksApi?: TasksApi;
}

export function makeStore({
  tasks = MOCK_TASKS,
  tasksApi = createMockTasksApi({
    latencyMs: env.mockApiLatencyMs,
    failureRate: env.mockApiFailureRate,
  }),
}: StoreOptions = {}) {
  const extraArgument: TasksThunkExtra = { tasksApi };

  return configureStore({
    reducer: rootReducer,
    preloadedState: { tasks: createTasksState(tasks) },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: { extraArgument } }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
