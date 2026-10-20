import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@/shared/theme';
import { Button, EmptyState } from '@/shared/ui';

/** Shown when a route (often a deep link) references a task that doesn't exist. */
export function TaskNotFound({ onBack }: { onBack: () => void }) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <EmptyState
        icon="search"
        title="Task not found"
        message="This task doesn't exist or may have been removed."
        action={<Button label="Back to tasks" icon="arrow-left" onPress={onBack} />}
      />
    </View>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  container: { flex: 1, justifyContent: 'center', backgroundColor: colors.background },
}));
