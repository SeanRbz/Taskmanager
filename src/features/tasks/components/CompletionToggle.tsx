import React from 'react';
import { Pressable, View } from 'react-native';
import { makeStyles, PRESSED_OPACITY, TOUCH_TARGET, useTheme } from '@/shared/theme';
import { Icon } from '@/shared/ui';

interface CompletionToggleProps {
  done: boolean;
  /** The task title — announced together with the checked state. */
  label: string;
  disabled?: boolean;
  onToggle: () => void;
}

export function CompletionToggle({ done, label, disabled = false, onToggle }: CompletionToggleProps) {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityHint={done ? 'Marks the task as not done' : 'Marks the task as done'}
      // aria-* props map to native accessibilityState *and* to ARIA on web.
      aria-checked={done}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onToggle}
      style={({ pressed }) => [styles.target, pressed && styles.pressed]}
    >
      <View style={[styles.circle, done && styles.circleDone]}>
        {done ? <Icon name="check" size="sm" color={colors.onPrimary} /> : null}
      </View>
    </Pressable>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  target: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: { opacity: PRESSED_OPACITY },
}));
