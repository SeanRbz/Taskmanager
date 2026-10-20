import React from 'react';
import { render } from '@testing-library/react-native';
import { AppProviders } from '@/app/AppProviders';
import type { ColorScheme } from '@/shared/theme';
import { AppStore, makeStore } from '@/store';
import { instantTasksApi } from './fakeTasksApi';

interface Options {
  store?: AppStore;
  scheme?: ColorScheme;
}

/** Renders `ui` inside the same providers the app uses. */
export async function renderWithProviders(
  ui: React.ReactElement,
  { store = makeStore({ tasksApi: instantTasksApi }), scheme = 'light' }: Options = {},
) {
  const result = await render(
    <AppProviders store={store} scheme={scheme}>
      {ui}
    </AppProviders>,
  );
  return { ...result, store };
}
