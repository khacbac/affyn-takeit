import {NavigationProp, RouteProp} from '@react-navigation/native';
import {FBPhoto} from '../types';

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
  PointSuccess: {data: FBPhoto};
};

export type AllParamList = RootStackParamList & RootTabParamList;

export type RootStackProps<T extends keyof AllParamList> = NavigationProp<
  AllParamList,
  T
>;

export type RootRouteProps<T extends keyof AllParamList> = RouteProp<
  AllParamList,
  T
>;
