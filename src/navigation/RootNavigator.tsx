import React, { useMemo } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import { useIncompleteCount } from '@/features/tasks/hooks/useTasks';
import { fontFamily, useTheme } from '@/shared/theme';
import { linking } from './linking';
import { createNavigationTheme } from './navigationTheme';
import { TasksNavigator } from './TasksNavigator';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

// The default 49pt bar is too short for a 24pt icon plus a 12pt label in this typeface.
const TAB_BAR_HEIGHT = 58;

export function RootNavigator() {
  const theme = useTheme();
  const { colors } = theme;
  const insets = useSafeAreaInsets();
  const navigationTheme = useMemo(() => createNavigationTheme(theme), [theme]);
  const incompleteCount = useIncompleteCount();

  return (
    <NavigationContainer linking={linking} theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingTop: 6,
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          tabBarLabelStyle: { fontFamily: fontFamily.semibold, fontSize: 12, lineHeight: 16 },
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: fontFamily.bold, color: colors.text },
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={TasksNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Feather name="check-square" color={color} size={size} />,
            tabBarBadge: incompleteCount > 0 ? incompleteCount : undefined,
            tabBarBadgeStyle: {
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              fontFamily: fontFamily.bold,
            },
            tabBarAccessibilityLabel: `Tasks, ${incompleteCount} open`,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarAccessibilityLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
