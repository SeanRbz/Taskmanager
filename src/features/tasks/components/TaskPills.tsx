import React from 'react';
import { Pill } from '@/shared/ui';
import { PRIORITY_META, STATUS_META } from '../model/taskMeta';
import type { TaskPriority, TaskStatus } from '../model/types';

export function PriorityPill({ priority }: { priority: TaskPriority }) {
  const { label, icon, tone } = PRIORITY_META[priority];
  return <Pill label={label} icon={icon} tone={tone} />;
}

export function StatusPill({ status }: { status: TaskStatus }) {
  const { label, icon, tone } = STATUS_META[status];
  return <Pill label={label} icon={icon} tone={tone} />;
}
