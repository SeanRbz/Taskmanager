import { Alert, Platform } from 'react-native';

const TITLE = "Couldn't save your change";
const MESSAGE = 'It has been undone. Check your connection and try again.';

/** Tells the user an optimistic update was rolled back. */
export function reportMutationError(error: unknown): void {
  // RTK's ConditionError means the request was skipped (another update for the
  // same task is still in flight) — nothing was applied, so nothing to report.
  if (error instanceof Object && 'name' in error && error.name === 'ConditionError') return;

  if (Platform.OS === 'web') {
    window.alert(`${TITLE}\n\n${MESSAGE}`);
  } else {
    Alert.alert(TITLE, MESSAGE);
  }
}
