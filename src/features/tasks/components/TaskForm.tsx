import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { centeredContent, makeStyles, spacing } from '@/shared/theme';
import { ActionBar, AppText, Button, ChipGroup, ChipOption, TextField } from '@/shared/ui';
import {
  PRIORITY_META,
  PRIORITY_ORDER,
  STATUS_META,
  STATUS_ORDER,
  TITLE_MAX_LENGTH,
} from '../model/taskMeta';
import type { TaskDraft, TaskPriority, TaskStatus } from '../model/types';
import { normalizeTaskDraft, validateTaskDraft } from '../model/validation';

const PRIORITY_OPTIONS: ChipOption<TaskPriority>[] = PRIORITY_ORDER.map(priority => ({
  value: priority,
  label: PRIORITY_META[priority].label,
  icon: PRIORITY_META[priority].icon,
}));

const STATUS_OPTIONS: ChipOption<TaskStatus>[] = STATUS_ORDER.map(status => ({
  value: status,
  label: STATUS_META[status].label,
  icon: STATUS_META[status].icon,
}));

interface TaskFormProps {
  initialValues: TaskDraft;
  saveDisabled?: boolean;
  onSubmit: (values: TaskDraft) => void;
  onCancel: () => void;
}

/** Presentational form: owns draft state and validation, knows nothing about the store. */
export function TaskForm({ initialValues, saveDisabled = false, onSubmit, onCancel }: TaskFormProps) {
  const styles = useStyles();
  const [values, setValues] = useState<TaskDraft>(initialValues);
  // Errors appear once the field is left or a save is attempted, not while typing.
  const [showErrors, setShowErrors] = useState(false);
  const errors = validateTaskDraft(values);

  const update = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) =>
    setValues(previous => ({ ...previous, [key]: value }));

  const handleSubmit = () => {
    if (errors.title) {
      setShowErrors(true);
      return;
    }
    onSubmit(normalizeTaskDraft(values));
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TextField
          label="Title"
          value={values.title}
          onChangeText={text => update('title', text)}
          onBlur={() => setShowErrors(true)}
          error={showErrors ? errors.title : undefined}
          maxLength={TITLE_MAX_LENGTH}
          autoCapitalize="sentences"
          returnKeyType="done"
        />
        <TextField
          label="Description"
          helper="Optional — add context, links or acceptance criteria."
          value={values.description}
          onChangeText={text => update('description', text)}
          multiline
        />
        <View style={styles.group}>
          <AppText variant="label">Priority</AppText>
          <ChipGroup
            options={PRIORITY_OPTIONS}
            value={values.priority}
            onChange={priority => update('priority', priority)}
            accessibilityLabel="Priority"
          />
        </View>
        <View style={styles.group}>
          <AppText variant="label">Status</AppText>
          <ChipGroup
            options={STATUS_OPTIONS}
            value={values.status}
            onChange={status => update('status', status)}
            accessibilityLabel="Status"
          />
        </View>
      </ScrollView>
      <ActionBar>
        <Button variant="secondary" label="Cancel" onPress={onCancel} style={styles.flex} />
        <Button
          label="Save"
          icon="check"
          onPress={handleSubmit}
          disabled={saveDisabled}
          style={styles.flex}
        />
      </ActionBar>
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles(() => ({
  flex: { flex: 1 },
  content: { ...centeredContent, padding: spacing.lg, gap: spacing.xl },
  group: { gap: spacing.sm },
}));
