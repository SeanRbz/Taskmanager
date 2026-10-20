import {
  addDays,
  daysUntil,
  describeDueDate,
  formatDate,
  formatShortDate,
  getDueStatus,
  parseISODate,
  toISODate,
} from '../date';

// Wednesday 15 April 2026, mid-afternoon local time.
const NOW = new Date(2026, 3, 15, 15, 30);

describe('date utils', () => {
  it('parses ISO dates as local calendar days (no UTC shift)', () => {
    const date = parseISODate('2026-04-15');
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 3, 15]);
  });

  it('round-trips through toISODate and handles month boundaries', () => {
    expect(toISODate(addDays(new Date(2026, 0, 31), 1))).toBe('2026-02-01');
  });

  it('counts whole calendar days regardless of the time of day', () => {
    expect(daysUntil('2026-04-14', NOW)).toBe(-1);
    expect(daysUntil('2026-04-15', NOW)).toBe(0);
    expect(daysUntil('2026-04-20', NOW)).toBe(5);
  });

  it('formats dates for display', () => {
    expect(formatDate('2026-03-28')).toBe('Mar 28, 2026');
    expect(formatShortDate('2026-03-28', NOW)).toBe('Mar 28');
    expect(formatShortDate('2025-12-31', NOW)).toBe('Dec 31, 2025');
  });

  it.each([
    ['2026-04-10', 'overdue', 'Overdue · Apr 10'],
    ['2026-04-15', 'today', 'Due today'],
    ['2026-04-16', 'soon', 'Due tomorrow'],
    ['2026-04-18', 'soon', 'Due in 3 days'],
    ['2026-05-30', 'upcoming', 'Due May 30'],
  ])('describes %s as %s ("%s")', (iso, status, label) => {
    expect(getDueStatus(iso, NOW)).toBe(status);
    expect(describeDueDate(iso, NOW)).toBe(label);
  });
});
