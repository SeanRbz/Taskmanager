import React from 'react';
import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { makeStore } from '@/store';
import { createDeferredTasksApi } from '@/test/fakeTasksApi';
import { buildTask } from '@/test/fixtures';
import { renderWithProviders } from '@/test/render';
import { RootNavigator } from '../RootNavigator';

// createURL reads the scheme from the Expo manifest, which Jest doesn't load.
jest.mock('expo-linking', () => ({
  createURL: (path: string) => `taskmanager://${path.replace(/^\//, '')}`,
}));

function setup() {
  const fake = createDeferredTasksApi();
  const store = makeStore({
    tasks: [
      buildTask({ id: 'mine', title: 'Write release notes', assignee: 'Alex Johnson' }),
      buildTask({ id: 'theirs', title: 'Review designs', assignee: 'Sam Rivera' }),
    ],
    tasksApi: fake.api,
  });
  return { fake, store, user: userEvent.setup() };
}

describe('RootNavigator', () => {
  it('reflects a completed task in the list, the tab badge and the profile', async () => {
    // Arrange
    const { fake, store, user } = setup();
    await renderWithProviders(<RootNavigator />, { store });
    expect(screen.getByLabelText('Tasks, 2 open')).toBeOnTheScreen();

    // Act — complete the task; the request stays in flight
    await user.press(screen.getByRole('checkbox', { name: 'Write release notes' }));

    // Assert — optimistic: every view updates before the request resolves
    expect(screen.getByRole('checkbox', { name: 'Write release notes' })).toBeChecked();
    expect(screen.getByLabelText('Tasks, 1 open')).toBeOnTheScreen();

    fake.resolveNext();
    await user.press(screen.getByRole('button', { name: /Profile/ }));
    await waitFor(() => expect(screen.getByLabelText('0 Open tasks')).toBeOnTheScreen());
  });

  it('rolls the list and badge back when the save fails', async () => {
    // Arrange
    const { fake, store, user } = setup();
    await renderWithProviders(<RootNavigator />, { store });

    // Act
    await user.press(screen.getByRole('checkbox', { name: 'Review designs' }));
    fake.rejectNext();

    // Assert
    await waitFor(() =>
      expect(screen.getByRole('checkbox', { name: 'Review designs' })).not.toBeChecked(),
    );
    expect(screen.getByLabelText('Tasks, 2 open')).toBeOnTheScreen();
  });
});
