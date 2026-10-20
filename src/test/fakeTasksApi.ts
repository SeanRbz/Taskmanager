import type { TasksApi } from '@/features/tasks/api/tasksApi';
import type { Task } from '@/features/tasks/model/types';

interface InFlightRequest {
  task: Task;
  resolve: (task: Task) => void;
  reject: (error: Error) => void;
}

/**
 * A TasksApi whose requests stay in flight until the test settles them, so the
 * optimistic state *between* dispatch and response can be asserted.
 */
export function createDeferredTasksApi() {
  const requests: InFlightRequest[] = [];

  const api: TasksApi = {
    updateTask: task =>
      new Promise<Task>((resolve, reject) => {
        requests.push({ task, resolve, reject });
      }),
  };

  function next(): InFlightRequest {
    const request = requests.shift();
    if (!request) throw new Error('No request in flight');
    return request;
  }

  return {
    api,
    requests,
    resolveNext() {
      const request = next();
      request.resolve({ ...request.task });
    },
    rejectNext(error = new Error('Network request failed')) {
      next().reject(error);
    },
  };
}

/** Resolves every request immediately. */
export const instantTasksApi: TasksApi = {
  updateTask: async task => ({ ...task }),
};
