// Safe-area insets come from a native module; use the library's official mock.
// jest.mock factories are hoisted above imports, so they must use require().
jest.mock('react-native-safe-area-context', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('react-native-safe-area-context/jest/mock').default,
);
