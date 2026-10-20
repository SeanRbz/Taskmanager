import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  EditTask: { taskId: string };
};

export type RootTabParamList = {
  Tasks: NavigatorScreenParams<TasksStackParamList> | undefined;
  Profile: undefined;
};

export type TasksStackScreenProps<T extends keyof TasksStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<TasksStackParamList, T>,
  BottomTabScreenProps<RootTabParamList>
>;

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
  RootTabParamList,
  T
>;

// Types `useNavigation()` and `<Link>` app-wide.
declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootTabParamList {}
  }
}
