import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import type { RootTabParamList } from './types';

/**
 * taskmanager://task/task-001     → TaskDetail (native)
 * http://localhost:8080/task/task-001 → TaskDetail (web build)
 *
 * `initialRouteName` keeps TaskList beneath a deep-linked detail screen so the
 * back button has somewhere to go.
 */
export const linking: LinkingOptions<RootTabParamList> = {
  prefixes: [Linking.createURL('/'), 'taskmanager://'],
  config: {
    screens: {
      Tasks: {
        initialRouteName: 'TaskList',
        screens: {
          TaskList: '',
          TaskDetail: 'task/:taskId',
          EditTask: 'task/:taskId/edit',
        },
      },
      Profile: 'profile',
    },
  },
};
