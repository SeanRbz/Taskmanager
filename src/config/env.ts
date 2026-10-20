// Build-time configuration. Expo inlines `EXPO_PUBLIC_*` variables, so each one
// must be read with a static `process.env.NAME` expression.

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return value !== undefined && value !== '' && Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  /** Simulated network latency for the mock tasks API. */
  mockApiLatencyMs: toNumber(process.env.EXPO_PUBLIC_MOCK_API_LATENCY_MS, 300),
  /** Probability (0–1) of a simulated request failure, to demo optimistic rollback. */
  mockApiFailureRate: toNumber(process.env.EXPO_PUBLIC_MOCK_API_FAILURE_RATE, 0),
};
