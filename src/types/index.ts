// ─────────────────────────────────────────────────────────────────────────────
// types.ts — Core domain types for the Task Manager assessment
//
// These types are provided for you. Do not modify the Task interface.
// You may add additional types as needed (e.g. for navigation params,
// state shape, hook return values, etc.).
// ─────────────────────────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string; // ISO date string e.g. "2026-04-15"
  createdAt: string; // ISO date string
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation param types — stub provided, complete as needed
// ─────────────────────────────────────────────────────────────────────────────

export type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  EditTask: { taskId: string };
};

export type RootTabParamList = {
  Tasks: undefined;
  Profile: undefined;
};

// ─────────────────────────────────────────────────────────────────────────────
// User type — used for the Profile tab
// ─────────────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
}
