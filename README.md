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
- Fixed Expo Go setup issues when running on a Windows laptop with a physical device for testing
- Used Redux Toolkit (RTK) to modernize state management and reduce Redux boilerplate (actions, reducers, and store setup simplified)
- Chose Jest for testing, as it integrates well with Expo and React Native projects
- Kept UI implementation minimal to focus on core functionality and logic rather than styling complexity

**Assumptions made:**
- “Optimistic update” is interpreted as immediately updating the UI on user interaction, without waiting for async confirmation (no API layer or persistent storage implemented)
- Mock data is hard coded only and is not persisted to local storage due to time constraints
- dueDate and createdAt are stored as ISO strings and rendered directly without additional formatting utilities or date libraries
- “Marking complete” is treated as a one-way action (tasks cannot be reverted to incomplete, based on brief interpretation)
- Deep linking is implemented in a basic form and validated manually as per requirements

**If I had more time:**
- Introduce an API layer using Axios to simulate real backend interactions and better structure async flows (useEffect, useLayoutEffect, etc.)
- Improve UI/UX design with better spacing, hierarchy, and interaction feedback
- Create reusable utility functions for parsing and formatting dueDate and createdAt
- Improve navigation and data flow by using structured route params more consistently
- Consider using React Query for server-state management, caching, and request handling if the app scales
- Create reusable components for texts, task list screen renders. etc


---

## Time Limit

**2 hours.** Focus on architecture and correctness over completeness. A well-structured partial solution is preferred over a messy complete one.
