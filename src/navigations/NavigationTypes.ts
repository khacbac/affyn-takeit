import {NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Gallery: undefined;
  Camera: undefined;
};

export type RootStackProps<T extends keyof RootStackParamList> = NavigationProp<
  RootStackParamList,
  T
>;