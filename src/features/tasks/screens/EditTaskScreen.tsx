import React from 'react';
import type { TasksStackScreenProps } from '@/navigation/types';
import { TaskForm } from '../components/TaskForm';
import { TaskNotFound } from '../components/TaskNotFound';
import { useIsTaskPending, useTask, useTaskActions } from '../hooks/useTasks';
import type { TaskDraft } from '../model/types';
import { toTaskDraft } from '../model/validation';
import { reportMutationError } from '../utils/mutationFeedback';

type Props = TasksStackScreenProps<'EditTask'>;

/** Container: resolves the task and wires the presentational form to the store. */
export default function EditTaskScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const task = useTask(taskId);
  const pending = useIsTaskPending(taskId);
  const { saveTask } = useTaskActions();

  if (!task) {
    return <TaskNotFound onBack={() => navigation.navigate('TaskList')} />;
  }

  const handleSubmit = (values: TaskDraft) => {
    // The optimistic update lands synchronously, so the detail and list screens
    // already show the edit when we navigate back. A failure rolls it back.
    saveTask({ ...task, ...values }).catch(reportMutationError);
    navigation.goBack();
  };

  return (
    <TaskForm
      initialValues={toTaskDraft(task)}
      saveDisabled={pending}
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
    />
  );
}
