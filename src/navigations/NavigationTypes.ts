import {NavigationProp} from '@react-navigation/native';

export type RootTabParamList = {
  Gallery: undefined;
  Scan: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  BottomTabs: undefined;
  Camera: undefined;
  PointSuccess: undefined;
};

export type AllParamList = RootStackParamList & RootTabParamList;

export type RootStackProps<T extends keyof AllParamList> = NavigationProp<
  AllParamList,
  T
>;
