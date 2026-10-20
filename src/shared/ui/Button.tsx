import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { hitSlop, makeStyles, PRESSED_OPACITY, radius, spacing, useTheme } from '@/shared/theme';
import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, variant = 'primary', icon, disabled, style, ...rest }: ButtonProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const foreground = variant === 'primary' ? colors.onPrimary : colors.primary;

  return (
    <Pressable
      accessibilityRole="button"
      // Explicit label so the icon glyph never leaks into the accessible name.
      accessibilityLabel={label}
      hitSlop={hitSlop}
      {...rest}
      disabled={disabled}
      aria-disabled={!!disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <Icon name={icon} color={foreground} /> : null}
      <AppText variant="callout" weight="semibold" style={{ color: foreground }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  base: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  primary: { backgroundColor: colors.primary },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  ghost: { backgroundColor: 'transparent' },
  pressed: { opacity: PRESSED_OPACITY },
  disabled: { opacity: 0.45 },
}));
