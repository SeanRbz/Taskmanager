import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { hitSlop, makeStyles, PRESSED_OPACITY, radius, spacing, useTheme } from '@/shared/theme';
import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
  count?: number;
}

interface ChipGroupProps<T extends string> {
  options: readonly ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Names the group for screen readers, e.g. "Filter by priority". */
  accessibilityLabel: string;
  /** Single scrolling row instead of wrapping lines. */
  scrollable?: boolean;
}

/** Single-select chip set exposed to assistive tech as a radio group. */
export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
  scrollable = false,
}: ChipGroupProps<T>) {
  const styles = useStyles();
  const chips = options.map(option => (
    <Chip
      key={option.value}
      option={option}
      selected={option.value === value}
      onSelect={onChange}
    />
  ));

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        contentContainerStyle={styles.row}
      >
        {chips}
      </ScrollView>
    );
  }

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[styles.row, styles.wrap]}
    >
      {chips}
    </View>
  );
}

interface ChipProps<T extends string> {
  option: ChipOption<T>;
  selected: boolean;
  onSelect: (value: T) => void;
}

function Chip<T extends string>({ option, selected, onSelect }: ChipProps<T>) {
  const styles = useStyles();
  const { colors } = useTheme();
  const foreground = selected ? colors.onPrimary : colors.text;
  const countLabel = option.count === undefined ? '' : `, ${option.count}`;

  return (
    <Pressable
      accessibilityRole="radio"
      aria-checked={selected}
      accessibilityLabel={`${option.label}${countLabel}`}
      hitSlop={hitSlop}
      onPress={() => onSelect(option.value)}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}
    >
      {option.icon ? (
        <Icon name={option.icon} size="sm" color={selected ? colors.onPrimary : colors.textMuted} />
      ) : null}
      <AppText variant="label" maxFontSizeMultiplier={1.5} style={{ color: foreground }}>
        {option.label}
      </AppText>
      {option.count !== undefined ? (
        <AppText
          variant="caption"
          maxFontSizeMultiplier={1.5}
          style={{ color: selected ? colors.onPrimary : colors.textMuted }}
        >
          {option.count}
        </AppText>
      ) : null}
    </Pressable>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  wrap: { flexWrap: 'wrap' },
  chip: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.md + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: { opacity: PRESSED_OPACITY },
}));
