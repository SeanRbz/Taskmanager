import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/** Light confirmation tap for state changes such as completing a task. */
export function confirmTap(): void {
  if (Platform.OS === 'web') return;
  // Haptics are a progressive enhancement; devices without an engine reject.
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}
