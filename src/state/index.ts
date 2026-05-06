// ─────────────────────────────────────────────────────────────────────────────
// state/index.ts — State management stub
//
// This file is intentionally empty. Your task is to implement a state
// management solution of your choice here (useState, useReducer, Context,
// Zustand, Jotai, etc.).
//
// Your state layer must support:
//   1. Storing the full task list (seeded from MOCK_TASKS on startup)
//   2. Updating a single task (used by EditTaskScreen)
//   3. Toggling a task's completion status (optimistic update on TaskListScreen)
//   4. Deriving incomplete task count (used by tab badge and ProfileScreen)
//   5. Being accessible from both the Tasks tab stack and the Profile tab
//      without prop drilling beyond one level
//
// You will be asked to justify your choice during the follow-up interview.
// ─────────────────────────────────────────────────────────────────────────────

import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_TASKS } from '@/data/mockData';
import { Task } from '@/types';

interface TasksState {
  tasks: Task[];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: MOCK_TASKS } as TasksState,
  reducers: {
    updateTask(state, action: PayloadAction<Task>) {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    completeTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.status = 'done';
    },
  },
});

export const { updateTask, completeTask } = tasksSlice.actions;

export const store = configureStore({ reducer: { tasks: tasksSlice.reducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
