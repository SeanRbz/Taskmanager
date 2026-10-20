import React, { memo } from 'react';
import { View } from 'react-native';
import { makeStyles, radius, spacing, ToneName, useTheme } from '@/shared/theme';
import { AppText } from './AppText';
import { Icon, IconName } from './Icon';

interface PillProps {
  label: string;
  tone?: ToneName;
  /** Pills always pair colour with an icon and text so colour is never the only signal. */
  icon?: IconName;
}

export const Pill = memo(function Pill({ label, tone = 'neutral', icon }: PillProps) {
  const styles = useStyles();
  const { tones } = useTheme();
  const { background, foreground } = tones[tone];

  return (
    <View style={[styles.pill, { backgroundColor: background }]}>
      {icon ? <Icon name={icon} size="xs" color={foreground} /> : null}
      <AppText
        variant="caption"
        weight="semibold"
        numberOfLines={1}
        maxFontSizeMultiplier={1.4}
        style={{ color: foreground }}
      >
        {label}
      </AppText>
    </View>
  );
});

const useStyles = makeStyles(() => ({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radius.pill,
  },
}));
