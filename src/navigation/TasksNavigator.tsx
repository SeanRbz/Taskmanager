import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditTaskScreen from '@/features/tasks/screens/EditTaskScreen';
import TaskDetailScreen from '@/features/tasks/screens/TaskDetailScreen';
import TaskListScreen from '@/features/tasks/screens/TaskListScreen';
import { fontFamily, useTheme } from '@/shared/theme';
import type { TasksStackParamList } from './types';

const Stack = createNativeStackNavigator<TasksStackParamList>();

export function TasksNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontFamily: fontFamily.bold, color: colors.text },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          title: 'Tasks',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLargeTitleStyle: { fontFamily: fontFamily.extrabold, color: colors.text },
        }}
      />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task' }} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit task' }} />
    </Stack.Navigator>
  );
}
