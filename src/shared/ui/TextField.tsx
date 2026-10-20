import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { fontFamily, makeStyles, radius, spacing, typography, useTheme } from '@/shared/theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  helper?: string;
}

/** Labelled input with the error rendered next to the field, never placeholder-only. */
export function TextField({
  label,
  error,
  helper,
  multiline,
  style,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.danger : focused ? colors.primary : colors.borderStrong;

  return (
    <View style={styles.field}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error ?? helper}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        {...rest}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={event => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={[styles.input, multiline && styles.multiline, { borderColor }, style]}
      />
      {error ? (
        <View style={styles.message} accessibilityLiveRegion="polite">
          <Icon name="alert-circle" size="sm" color={colors.danger} />
          <AppText variant="caption" color="danger">
            {error}
          </AppText>
        </View>
      ) : helper ? (
        <AppText variant="caption" color="textMuted">
          {helper}
        </AppText>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  field: { gap: spacing.sm },
  input: {
    minHeight: 48,
    // Constant width: focus/error only change colour, so the layout never shifts.
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    backgroundColor: colors.surface,
    color: colors.text,
    fontFamily: fontFamily.regular,
    fontSize: typography.body.fontSize,
  },
  multiline: {
    minHeight: 120,
    paddingTop: spacing.md,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
}));
