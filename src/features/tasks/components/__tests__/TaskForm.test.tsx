import React from 'react';
import { screen, userEvent } from '@testing-library/react-native';
import { renderWithProviders } from '@/test/render';
import type { TaskDraft } from '../../model/types';
import { TaskForm } from '../TaskForm';

const initialValues: TaskDraft = {
  title: 'Ship it',
  description: '',
  priority: 'high',
  status: 'todo',
};

async function setup() {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  await renderWithProviders(
    <TaskForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onCancel} />,
  );
  return { onSubmit, onCancel, user: userEvent.setup() };
}

describe('TaskForm', () => {
  it('blocks saving without a title and shows the error next to the field', async () => {
    // Arrange
    const { onSubmit, user } = await setup();

    // Act
    await user.clear(screen.getByLabelText('Title'));
    await user.press(screen.getByRole('button', { name: 'Save' }));

    // Assert
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Title is required')).toBeOnTheScreen();
  });

  it('submits trimmed values with the selected priority and status', async () => {
    // Arrange
    const { onSubmit, user } = await setup();

    // Act
    await user.clear(screen.getByLabelText('Title'));
    await user.type(screen.getByLabelText('Title'), '  Ship v2  ');
    await user.press(screen.getByRole('radio', { name: 'Low' }));
    await user.press(screen.getByRole('radio', { name: 'Done' }));
    await user.press(screen.getByRole('button', { name: 'Save' }));

    // Assert
    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Ship v2',
      description: '',
      priority: 'low',
      status: 'done',
    });
  });

  it('cancels without submitting', async () => {
    const { onSubmit, onCancel, user } = await setup();
    await user.press(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
