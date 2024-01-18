import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

import React from 'react';
import {CameraScreen, GalleryScreen, LoginScreen} from '../features';
import {RootStackParamList} from './NavigationTypes';
import {Pressable, Text} from 'react-native';

type IProps = {};
export const RootNavigation: React.FC<IProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
};
