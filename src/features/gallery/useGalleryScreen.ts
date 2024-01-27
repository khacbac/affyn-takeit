import {useEffect} from 'react';
import {
  removeUser,
  selectUser,
  setIsLoggedIn,
  setPhotos,
  setUser,
  setUserLocation,
  updateUser,
  useAppSelector,
} from '../../states';
import {FBPhoto} from '../../types';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {useAppPermission} from '../../hooks';
import Geolocation from '@react-native-community/geolocation';
import {firebaseManager} from '../../firebase';
import auth from '@react-native-firebase/auth';
import {modalManager} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';

export const useGalleryScreen = () => {
  const navigation = useNavigation<RootStackProps<'Gallery'>>();
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const {requestLocationPermission} = useAppPermission();

  useEffect(() => {
    const subscriber = firebaseManager
      .getFirestore('users')
      .doc(user.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.data();
        if (data) {
          dispatch(updateUser(data));
        }
      });
    return subscriber; // unsubscribe on unmount
  }, [user.id]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const subscriber = firebaseManager
      .getFirestore('gallery')
      .where('authorID', '==', user.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const list: FBPhoto[] = [];
        querySnapshot?.forEach(doc => {
          const data = doc.data();
          list.push({
            authorID: data.authorID,
            photoPath: data.photoPath,
            photoUrl: data.photoUrl,
            title: data.title,
            location: data.location,
            points: data.points,
            ...(data.createdAt && {
              createdAt: new Date(data.createdAt?.toDate()).toISOString(),
            }),
          });
        });
        if (list.length > 0) {
          dispatch(setPhotos(list));
        } else {
          dispatch(setPhotos([]));
        }
      });

    return () => subscriber();
  }, [user]);

  useEffect(() => {
    requestLocationPermission()
      .then(() => {
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
      })
      .catch(() => {});
  }, []);

  const openPhoto = () => {
    Alert.alert('', 'Coming soon');
  };

  const onLogOut = () => {
    modalManager.showLoading();
    auth()
      .signOut()
      .then(() => {
        dispatch(removeUser());
        dispatch(setIsLoggedIn(false));
      })
      .catch(() => {})
      .finally(() => {
        modalManager.hideLoading();
      });
  };

  const gotoProfile = () => {
    navigation.navigate('Profile');
  };

  return {funcs: {openPhoto, onLogOut, gotoProfile}};
};
