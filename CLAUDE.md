# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                      # Expo dev server (i / a / w for iOS / Android / web)
npm run check                  # typecheck + lint + tests — run before considering work done
npm run typecheck              # tsc --noEmit (strict)
npm run lint                   # eslint . (eslint-config-expo flat config)
npm test                       # jest (jest-expo preset)
npx jest src/features/tasks/state            # one folder
npx jest -t "rolls back"                     # tests whose name matches
npm run build:web              # static web export → dist/

docker compose up --build              # production web image → http://localhost:8080
docker compose run --rm test           # npm run check in a clean container (CI)
docker compose --profile dev up dev    # Metro on :8081 (set REACT_NATIVE_PACKAGER_HOSTNAME for Expo Go)
```

Add dependencies with `npx expo install <pkg>` (not `npm install`) so versions match Expo SDK 54.

## Architecture

Expo SDK 54 / React Native 0.81 / React 19, Redux Toolkit, React Navigation 7 (bottom tabs + native stack). Runs on iOS, Android and web (react-native-web). Path alias `@/` → `src/` (babel `module-resolver` + tsconfig `paths` + jest `moduleNameMapper` — keep all three in sync).

Feature-first layout: `src/features/<feature>/{api,model,state,hooks,components,screens}`; `src/shared/` (theme, ui primitives, utils) must not import from features. `src/app/` holds the root (`App.tsx` loads fonts, `AppProviders` = Redux → SafeArea → Theme → ErrorBoundary). Entry is `index.js` → `src/app/App`.

### State and optimistic updates (`src/features/tasks/state`)

- `makeStore({ tasks?, tasksApi? })` in `src/store` is a **factory**, not a singleton. The `TasksApi` is injected as the thunk `extraArgument`; the default is the in-memory mock in `features/tasks/api/tasksApi.ts` (latency/failure rate from `EXPO_PUBLIC_MOCK_API_*`, read in `src/config/env.ts`).
- Tasks are stored with `createEntityAdapter`. `TasksState.pending` maps task id → pre-mutation snapshot.
- Every mutation is a `createAsyncThunk` with the same lifecycle: **`pending` reducer snapshots + applies the change** (UI updates synchronously during `dispatch`), `fulfilled` commits the API result, `rejected` restores the snapshot. A `condition` blocks a second mutation on a task that is already pending (no actions are dispatched in that case — callers see an RTK `ConditionError`, which `reportMutationError` ignores). New mutations should follow this pattern rather than adding plain reducers.
- The slice only types against `TasksRootState` (`{ tasks }`), not the app `RootState`, to avoid an import cycle with `src/store`.
- Components read state through narrow hooks in `features/tasks/hooks/useTasks.ts` backed by memoised selectors in `selectors.ts`; mutations go through `useTaskActions()` whose promises reject after rollback (screens `.catch(reportMutationError)`).

### Navigation (`src/navigation`)

Param lists and screen-prop helpers (`TasksStackScreenProps`, `RootTabScreenProps`) live in `navigation/types.ts`, which also augments `ReactNavigation.RootParamList`. Deep links (`linking.ts`): `taskmanager://task/:taskId`, `/task/:taskId/edit`, `/profile`; `initialRouteName: 'TaskList'` keeps a back target under deep-linked screens. Mock task IDs (`task-001`…) are part of the deep-link contract — don't rename them. Cross-tab navigation uses `navigate('Tasks', { screen, params, initial: false })`.

### Theme and UI (`src/shared/theme`, `src/shared/ui`)

- Never hardcode colours/spacing in components: use tokens from `@/shared/theme` and define styles with `const useStyles = makeStyles(theme => ({...}))` (one cached StyleSheet per theme object). Light/dark follow the OS via `ThemeProvider`.
- Render all text with `AppText` — the font (Plus Jakarta Sans) needs an explicit family per weight; a numeric `fontWeight` on a custom family falls back to the system font on Android.
- Icons: `Icon` (Feather only). Import vector icons by deep path (`@expo/vector-icons/Feather`); the package root bundles every icon font.
- Accessibility props: use `aria-checked` / `aria-disabled` rather than `accessibilityState` — react-native-web ignores `accessibilityState`, while RN maps `aria-*` natively. Keep touch targets ≥ 44pt (`TOUCH_TARGET`, `hitSlop`), pressed feedback opacity-only (no layout shift), and pair colour with icon + text.
- New colour pairs must pass WCAG AA; check with `python .claude/skills/mobile-app-design/scripts/check-contrast.py "<fg>" "<bg>"` (set `PYTHONIOENCODING=utf-8` on Windows). Design rationale and deviations from the generated system: `design-system/team-task-manager/pages/mobile-app.md` (overrides `MASTER.md`).

## Testing

Tests are colocated in `__tests__/` folders and follow Arrange / Act / Assert comments. Helpers in `src/test/`:
- `renderWithProviders(ui, { store, scheme })` — wraps in the real `AppProviders`; it is async (RNTL v14: `await render`). Use `userEvent.setup()` and role/label queries.
- `createDeferredTasksApi()` — requests stay in flight until `resolveNext()` / `rejectNext()`, to assert the optimistic state between dispatch and response. `instantTasksApi` resolves immediately.
- `buildTask(overrides)` — deterministic task fixture.

Jest gotchas: `transformIgnorePatterns` in `package.json` extends jest-expo's list with the Redux packages (they ship ESM under the react-native condition); `jest.setup.ts` mocks `react-native-safe-area-context`; tests rendering `RootNavigator` must `jest.mock('expo-linking')` because `createURL` needs the Expo manifest.

## Project notes

- `expo-asset` must stay a top-level dependency — `expo-font` (used by vector icons) resolves it and both Metro and Jest fail without it.
- Seed data in `src/mocks/` uses dates relative to today; date strings are `YYYY-MM-DD` and must be parsed with `parseISODate` (local calendar day), never `new Date(iso)`.
- Docker: `Dockerfile` targets `web` (default, nginx on 8080 with SPA fallback + `/healthz`, config in `docker/nginx.conf`), `test`, `dev`. `EXPO_PUBLIC_*` values are build args, inlined at export time.
- Project skills in `.claude/skills/`: `ui-ux-pro-max` (search with `python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack react-native` or `--domain ux`) and `mobile-app-design` (platform guidelines, contrast/a11y scripts). `.claude/` is excluded from tsc, eslint, jest and the Docker context.
