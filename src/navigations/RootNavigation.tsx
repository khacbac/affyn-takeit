import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  CameraScreen,
  GalleryScreen,
  LoginScreen,
  SignUpScreen,
} from '../features';
import {RootStackParamList} from './NavigationTypes';
import {
  selectIsLoggedIn,
  setIsLoggedIn,
  setUser,
  setUserLocation,
  useAppDispatch,
  useAppSelector,
} from '../states';
import {firebaseManager} from '../firebase';
import {Container} from '../components';
import {Alert, Image} from 'react-native';
import {AppImages} from '../assets';
import Geolocation from '@react-native-community/geolocation';
import {useAppPermission} from '../hooks';

type IProps = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigation: React.FC<IProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {checkIfLocationPermissionEnable} = useAppPermission();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    const usersRef = firebaseManager.getFirestore('users');
    auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData: any = document.data();
            // dispatch(setUser(userData));
            // dispatch(setIsLoggedIn(true));
          })
          .catch(error => {})
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    checkIfLocationPermissionEnable().then(isEnabled => {
      if (isEnabled) {
        Geolocation.getCurrentPosition(
          pos => {
            dispatch(
              setUserLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              }),
            );
          },
          err => {},
          {timeout: 5000, enableHighAccuracy: false},
        );
      }
    });
  }, []);

  if (loading) {
    return (
      <Container
        contentStyle={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={AppImages.logo} style={{width: 100, height: 100}} />
      </Container>
    );
  }

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
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
