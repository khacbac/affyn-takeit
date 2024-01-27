import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  CameraScreen,
  GalleryScreen,
  LoginScreen,
  PointSuccessScreen,
  ProfileScreen,
  SignUpScreen,
} from '../features';
import {RootStackParamList, RootTabParamList} from './NavigationTypes';
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
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {AppColors, AppImages} from '../assets';
import Geolocation from '@react-native-community/geolocation';
import {useAppPermission} from '../hooks';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

type IProps = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const source =
          route.name === 'Gallery'
            ? AppImages.home
            : route.name === 'Scan'
            ? AppImages.scan
            : AppImages['user-profile'];

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Scan') {
            navigation.navigate('Camera');
            return;
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View
            key={route.key}
            style={{
              flex: 1,
              height: 80,
              backgroundColor: AppColors.background,
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                paddingBottom: bottom,
                backgroundColor: 'rgba(74, 59, 138, 1)',
                justifyContent: 'center',
                alignItems: 'center',
                ...(route.name === 'Gallery' && {borderTopLeftRadius: 24}),
                ...(route.name === 'Profile' && {borderTopRightRadius: 24}),
              }}
              key={route.key}>
              <Image
                source={source}
                tintColor={isFocused ? AppColors.white : AppColors.inactive}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Scan" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export const RootNavigation: React.FC<IProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {checkIfLocationPermissionEnable} = useAppPermission();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // useEffect(() => {
  //   const usersRef = firebaseManager.getFirestore('users');
  //   auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then(document => {
  //           const userData: any = document.data();
  //           if (userData) {
  //             dispatch(setUser(userData));
  //             dispatch(setIsLoggedIn(true));
  //           }
  //         })
  //         .catch(error => {})
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

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

  // if (loading) {
  //   return (
  //     <Container
  //       contentStyle={{justifyContent: 'center', alignItems: 'center'}}>
  //       <Image source={AppImages.logo} style={{width: 100, height: 100}} />
  //     </Container>
  //   );
  // }

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
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PointSuccess"
            component={PointSuccessScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
