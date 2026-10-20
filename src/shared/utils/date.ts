// Calendar-date helpers for the `YYYY-MM-DD` strings stored on tasks.
// Dates are parsed as *local* calendar days: `new Date('2026-04-15')` would be
// UTC midnight and render as the previous day west of Greenwich.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_MS = 24 * 60 * 60 * 1000;

export type DueStatus = 'overdue' | 'today' | 'soon' | 'upcoming';

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Whole calendar days from `now` until `iso`; negative when `iso` is in the past. */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // Rounding absorbs the 23h/25h days around DST changes.
  return Math.round((parseISODate(iso).getTime() - today.getTime()) / DAY_MS);
}

/** "Mar 28, 2026" */
export function formatDate(iso: string): string {
  const date = parseISODate(iso);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** "Mar 28", or "Mar 28, 2025" when the year differs from `now`. */
export function formatShortDate(iso: string, now: Date = new Date()): string {
  const date = parseISODate(iso);
  const label = `${MONTHS[date.getMonth()]} ${date.getDate()}`;
  return date.getFullYear() === now.getFullYear() ? label : `${label}, ${date.getFullYear()}`;
}

export function getDueStatus(iso: string, now: Date = new Date()): DueStatus {
  const days = daysUntil(iso, now);
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  if (days <= 3) return 'soon';
  return 'upcoming';
}

export function describeDueDate(iso: string, now: Date = new Date()): string {
  const days = daysUntil(iso, now);
  if (days < 0) return `Overdue · ${formatShortDate(iso, now)}`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days < 7) return `Due in ${days} days`;
  return `Due ${formatShortDate(iso, now)}`;
}
