# Team Task Manager

A cross-platform team task manager built with **Expo SDK 54 / React Native 0.81**, **Redux Toolkit** and **React Navigation 7**. It runs on iOS, Android and the web, has light and dark themes, and updates the UI optimistically with automatic rollback.

- **Tasks:** grouped by status, filtered by priority, with a team progress summary.
- **Task detail:** status, priority, assignee and relative due date ("Overdue · Oct 19", "Due tomorrow"), plus one-tap complete or reopen.
- **Edit:** a validated form with inline errors. Changes appear everywhere the moment you press Save.
- **Profile:** your open, in-progress and completed counts, plus an "Up next" list. All of it updates live from the shared store.
- **Deep links:** `taskmanager://task/task-001` on native, `/task/task-001` on the web.

---

## Quick start

**Prerequisites:** Node.js ≥ 20.19.4, plus the Expo Go app, an iOS Simulator or an Android Emulator.

```bash
npm install
npm start          # press i (iOS), a (Android) or w (web), or scan the QR code with Expo Go
```

### With Docker

```bash
docker compose up --build                  # production web build → http://localhost:8080
docker compose run --rm test               # typecheck + lint + tests in a clean container
docker compose --profile dev up dev        # Expo dev server on :8081
```

For Expo Go on a phone, set `REACT_NATIVE_PACKAGER_HOSTNAME` to your machine's LAN IP so the QR code points somewhere the phone can reach:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.20 docker compose --profile dev up dev
```

> On Windows and macOS, file-change events from bind mounts are unreliable. If live reload doesn't trigger, run `npm start` natively or keep the repo inside the WSL filesystem.

| Image target | Purpose | Details |
| --- | --- | --- |
| `web` *(default)* | Production | Static `expo export` served by non-root nginx on `:8080`. Has an SPA fallback for deep links, gzip, immutable caching of hashed assets, security headers and a `/healthz` health check. |
| `test` | CI | Runs `npm run check` |
| `dev` | Local development | Metro bundler with the source bind-mounted |

---

## Scripts

| Command | Description |
| --- | --- |
| `npm start` / `ios` / `android` / `web` | Start the Expo dev server |
| `npm run build:web` | Static web export to `dist/` |
| `npm test` · `test:watch` · `test:coverage` | Jest + React Native Testing Library |
| `npm run lint` | ESLint (`eslint-config-expo`) |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run check` | Typecheck, lint and test: the CI gate |

---

## Project structure

The code is organised by feature: each feature owns its model, state, hooks, components and screens. `shared/` contains code that knows nothing about tasks.

```
src/
├── app/                    # App root: providers, font loading, error boundary
├── config/env.ts           # EXPO_PUBLIC_* build-time settings
├── features/
│   ├── tasks/
│   │   ├── api/            # TasksApi interface + in-memory mock (the persistence boundary)
│   │   ├── model/          # Domain types, display metadata, validation
│   │   ├── state/          # RTK slice (entity adapter + optimistic thunks), memoised selectors
│   │   ├── hooks/          # Narrow hooks: useTask, useTaskSections, useTaskActions…
│   │   ├── components/     # TaskCard, TaskForm, CompletionToggle, pills, headers
│   │   ├── screens/        # TaskList, TaskDetail, EditTask
│   │   └── utils/
│   └── profile/            # ProfileScreen, UpNextRow, useCurrentUser
├── navigation/             # Tab + stack navigators, typed params, deep linking, nav theme
├── shared/
│   ├── theme/              # Tokens, light/dark palettes, ThemeProvider, makeStyles
│   ├── ui/                 # Design-system primitives: AppText, Button, Card, ChipGroup, Pill…
│   └── utils/              # Date formatting, haptics, text helpers
├── store/                  # makeStore() factory, typed hooks
├── mocks/                  # Seed data (dates relative to "today")
└── test/                   # Fixtures, controllable fake API, renderWithProviders
```

Tests live next to the code they cover, in `__tests__/` folders.

---

## Engineering decisions

### State management: Redux Toolkit

- **One shared store.** The Tasks tab, the tab badge and the Profile screen all read from it, so a change made on one screen shows up on the others immediately without prop drilling.
- **`createEntityAdapter`** gives O(1) lookups by id and normalised updates.
- **Memoised selectors** (`createSelector`) derive sections, counts and per-assignee stats. Components subscribe through **narrow hooks** (`useTask(id)`, `useIncompleteCount()`…), so a list row only re-renders when its own task changes.
- **`makeStore()` is a factory, not a singleton.** Every test gets an isolated store, and the API is injected as the thunk `extraArgument`.

### Optimistic updates with rollback

`toggleTaskCompletion` and `saveTask` are async thunks that talk to a `TasksApi`:

1. **`pending`:** the reducer snapshots the task and applies the change, so the UI updates immediately.
2. **`fulfilled`:** the server's version replaces the snapshot.
3. **`rejected`:** the snapshot is restored and the user sees *"Couldn't save your change"*.

A `condition` guard allows only one in-flight mutation per task, which keeps rollback unambiguous. While a save is pending, the checkbox and the Save button are disabled. Set `EXPO_PUBLIC_MOCK_API_FAILURE_RATE=0.3` to watch rollbacks happen.

### Navigation and deep linking

The app uses a bottom-tab navigator (Tasks, Profile) with a native stack inside Tasks. Route params are fully typed, including a global `ReactNavigation.RootParamList`.

The linking config sets `initialRouteName: 'TaskList'`, so a deep link into a task still has a Back button. Profile's "Up next" rows navigate across tabs to the right task.

### UI and design system

The visual direction was generated with the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill: flat design, a teal and orange palette, and Plus Jakarta Sans. The output is persisted in [`design-system/team-task-manager/`](design-system/team-task-manager/MASTER.md).

It was then adapted for native using the [Mobile App Design](https://github.com/awesome-skills/mobile-app-design) skill:

- **Tokens only.** Every colour, spacing step, radius and type style comes from `src/shared/theme`, and components get theme-aware, cached styles through `makeStyles()`. No component contains a raw hex value.
- **Light and dark themes** follow the OS. Every text/background pair was checked with the skill's contrast checker and meets WCAG AA. The generated primary (`#0D9488`) only reaches 3.74:1 with white text, so buttons use teal-700 (`#0F766E`, 5.47:1).
- **Accessibility:**
  - Touch targets are at least 44pt.
  - Checkboxes and radio groups expose their checked state.
  - Labels are descriptive, and decorative icons are hidden from screen readers.
  - Colour is never the only signal: pills pair it with an icon and text.
  - Form errors appear next to the field.
- **Platform polish:**
  - A single outline icon family (Feather), with no emoji icons.
  - Pressed-state feedback that never shifts layout.
  - Haptic confirmation on native.
  - A large-title header on iOS.
  - Content capped at a readable width on tablets and the web.

### Error handling

An app-level error boundary renders a recoverable fallback instead of a blank screen. Missing or deep-linked task ids show a "Task not found" state with a way back.

---

## Testing

```bash
npm test
```

There are 37 tests across the slice, selectors, utilities, components and navigation. Each test follows Arrange / Act / Assert.

| Suite | What it proves |
| --- | --- |
| `tasksSlice.test.ts` | The optimistic update applies before the request resolves, success commits it, failure rolls back to the previous status, a concurrent toggle is ignored, and edits read back by id |
| `selectors.test.ts` | Grouping and sort order, priority filtering, the incomplete count decreasing on completion, per-assignee stats, memoisation |
| `TaskCard.test.tsx` / `TaskForm.test.tsx` | Accessible roles and names, the checkbox locking while pending, validation messages, trimmed submit values |
| `RootNavigator.test.tsx` | End to end: completing a task updates the list, the tab badge and Profile, and a failed save rolls all of them back |
| `date.test.ts` / `validation.test.ts` | Timezone-safe date handling and relative due labels, form rules |

To test deep links manually:

```bash
npx uri-scheme open "taskmanager://task/task-001" --ios
npx uri-scheme open "taskmanager://task/task-001" --android
# Web (Docker): http://localhost:8080/task/task-001
```

---

## Configuration

Copy `.env.example` to `.env`. Values are inlined at build time; for Docker, pass them as build args through `compose.yaml`.

| Variable | Default | Purpose |
| --- | --- | --- |
| `EXPO_PUBLIC_MOCK_API_LATENCY_MS` | `300` | Simulated request latency |
| `EXPO_PUBLIC_MOCK_API_FAILURE_RATE` | `0` | Probability (0–1) that a save fails |

---

## Assumptions & limitations

- **No backend yet.** `TasksApi` is an in-memory mock with simulated latency, and state resets on reload. Because the slice depends only on the interface, adding a real client is a contained change.
- **Seed dates are relative to today,** so the demo always shows a realistic mix of overdue, due-today and upcoming tasks.
- **Dates are calendar days** (`YYYY-MM-DD`). They are parsed as local dates to avoid the UTC off-by-one bug.
- **Reopening a completed task returns it to "To do".** Its earlier in-progress state isn't remembered.
- **There is one signed-in user** (`useCurrentUser` returns the mock user) until authentication exists.

## Roadmap

- Persist tasks with a real API (RTK Query or TanStack Query for caching and refetching) and offline storage.
- Create and delete tasks; filter by assignee; search.
- Toast-based feedback with "Undo", instead of an alert on rollback.
- Respect reduced-motion and add layout animations when cards change sections.
- E2E tests (Maestro or Detox) and a CI workflow running `docker compose run --rm test`.

---

## Working with Claude Code

[`CLAUDE.md`](CLAUDE.md) documents the architecture and conventions for AI-assisted development. Two project skills are vendored in `.claude/skills/` (both MIT licensed):

- **`ui-ux-pro-max`:** a searchable design knowledge base, e.g. `python .claude/skills/ui-ux-pro-max/scripts/search.py "list performance" --stack react-native`
- **`mobile-app-design`:** iOS/Android/RN guidelines, plus a contrast checker and accessibility audit scripts
