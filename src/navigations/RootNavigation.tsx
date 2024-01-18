import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {
  CameraScreen,
  GalleryScreen,
  LoginScreen,
  SignUpScreen,
} from '../features';
import {RootStackParamList} from './NavigationTypes';
import {selectIsLoggedIn, useAppSelector} from '../states';

type IProps = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigation: React.FC<IProps> = ({}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <Stack.Navigator>
      {!isLoggedIn && (
        <Stack.Group navigationKey="Guest">
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
        </Stack.Group>
      )}
      {isLoggedIn && (
        <Stack.Group navigationKey="User">
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
