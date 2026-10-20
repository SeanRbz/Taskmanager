import React from 'react';
import { screen, userEvent } from '@testing-library/react-native';
import { buildTask } from '@/test/fixtures';
import { renderWithProviders } from '@/test/render';
import { TaskCard } from '../TaskCard';

const task = buildTask({ id: 'task-42', title: 'Write release notes', priority: 'high' });

async function setup(overrides: Partial<React.ComponentProps<typeof TaskCard>> = {}) {
  const props = { task, pending: false, onOpen: jest.fn(), onToggle: jest.fn(), ...overrides };
  await renderWithProviders(<TaskCard {...props} />);
  return { ...props, user: userEvent.setup() };
}

describe('TaskCard', () => {
  it('exposes completion as an accessible checkbox and reports the task id', async () => {
    // Arrange
    const { onToggle, user } = await setup();
    const checkbox = screen.getByRole('checkbox', { name: 'Write release notes' });
    expect(checkbox).not.toBeChecked();

    // Act
    await user.press(checkbox);

    // Assert
    expect(onToggle).toHaveBeenCalledWith('task-42');
  });

  it('opens the task when the card body is pressed', async () => {
    // Arrange
    const { onOpen, user } = await setup();

    // Act
    await user.press(screen.getByRole('button', { name: /Write release notes\. High priority/ }));

    // Assert
    expect(onOpen).toHaveBeenCalledWith('task-42');
  });

  it('locks the checkbox while a save is in flight', async () => {
    // Arrange
    const { onToggle, user } = await setup({ pending: true });
    const checkbox = screen.getByRole('checkbox', { name: 'Write release notes' });

    // Act
    await user.press(checkbox);

    // Assert
    expect(checkbox).toBeDisabled();
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders completed tasks as checked', async () => {
    await setup({ task: { ...task, status: 'done' } });
    expect(screen.getByRole('checkbox', { name: 'Write release notes' })).toBeChecked();
  });
});
