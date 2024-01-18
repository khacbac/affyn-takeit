import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {
  CameraScreen,
  GalleryScreen,
  LoginScreen,
  SignUpScreen,
} from '../features';
import {RootStackParamList} from './NavigationTypes';

type IProps = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigation: React.FC<IProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
};
