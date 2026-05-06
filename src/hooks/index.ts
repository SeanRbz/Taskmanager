// ─────────────────────────────────────────────────────────────────────────────
// hooks/index.ts — Custom hooks stub
//
// BONUS: Implement a useTaskManager hook that encapsulates all task operations.
//
// Suggested interface (implement as you see fit):
//
//   const {
//     tasks,
//     getTaskById,
//     updateTask,
//     completeTask,
//     incompleteCount,
//   } = useTaskManager();
//
// ─────────────────────────────────────────────────────────────────────────────

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, updateTask, completeTask } from '@/state';
import { Task } from '@/types';

interface UseTaskManagerReturn {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  updateTask: (task: Task) => void;
  completeTask: (id: string) => void;
  incompleteCount: number;
}

export function useTaskManager(): UseTaskManagerReturn {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return {
    tasks,
    getTaskById: (id: string) => tasks.find(t => t.id === id),
    updateTask: (task: Task) => dispatch(updateTask(task)),
    completeTask: (id: string) => dispatch(completeTask(id)),
    incompleteCount: tasks.filter(t => t.status !== "done").length,
  };
}