import type { Task } from '../model/types';

/**
 * Persistence boundary for tasks. The slice only depends on this interface, so
 * the in-memory mock can be swapped for an HTTP client without touching state.
 */
export interface TasksApi {
  updateTask(task: Task): Promise<Task>;
}

interface MockTasksApiOptions {
  latencyMs?: number;
  /** Probability (0–1) that a request fails — useful for exercising rollback. */
  failureRate?: number;
}

export function createMockTasksApi({
  latencyMs = 300,
  failureRate = 0,
}: MockTasksApiOptions = {}): TasksApi {
  return {
    updateTask: task =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < failureRate) {
            reject(new Error('Network request failed'));
          } else {
            resolve({ ...task });
          }
        }, latencyMs);
      }),
  };
}
