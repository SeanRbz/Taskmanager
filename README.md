# Team Task Manager — Starter Project

This is the starter project for the **Senior React Native Engineer** coding assessment.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Xcode) or Android Emulator (Android Studio), or the Expo Go app on a physical device

### Setup

```bash
npm install
npm start
```

Press `i` to open iOS Simulator, `a` for Android, or scan the QR code with Expo Go.

### Running Tests

```bash
npm test
```

---

## Project Structure

```
src/
├── data/
│   └── mockData.ts          # 10 sample tasks — seed your state from here
├── hooks/
│   └── index.ts             # Custom hooks stub (bonus: useTaskManager)
├── navigation/
│   └── index.tsx            # Navigator setup — deep links pre-configured
├── screens/
│   ├── TaskListScreen.tsx   # Implement me
│   ├── TaskDetailScreen.tsx # Implement me
│   ├── EditTaskScreen.tsx   # Implement me
│   └── ProfileScreen.tsx    # Implement me
├── state/
│   └── index.ts             # State management — your choice of solution
└── types/
    └── index.ts             # Task interface and navigation param types
```

---

## What's Already Done

- Expo project with TypeScript configured
- React Navigation installed and wired up (bottom tabs + stack navigator)
- Deep link config for `taskmanager://task/:taskId` → TaskDetail screen
- All screen stubs with typed props
- Mock data (10 tasks, 1 user)
- Type definitions for `Task`, `User`, and navigation param lists
- Test scaffolding with placeholder tests

---

## Deep Link Testing

Once your TaskDetail screen is implemented, test deep linking with:

```bash
# iOS Simulator
npx uri-scheme open "taskmanager://task/task-001" --ios

# Android Emulator
npx uri-scheme open "taskmanager://task/task-001" --android
```

---

## Submission

When complete, please:

1. Push all code to the `main` branch of your provided repository
2. Ensure `npm start` runs without errors
3. Update this README with the sections below
4. Notify your recruiter via email: `[Your Name] — React Native Assessment Submitted`

### Please add to this README before submitting:

**State management choice:**
> _Which library/approach did you use, and why? What would make you switch?_

**Assumptions made:**
> _Anything that was ambiguous in the brief and how you resolved it_

**If I had more time:**
> _What would you do differently or add?_

---

## Time Limit

**2 hours.** Focus on architecture and correctness over completeness. A well-structured partial solution is preferred over a messy complete one.
