import {useEffect, useRef} from 'react';
import {useAppPermission} from '../../hooks';
import {Camera} from 'react-native-vision-camera';
import {modalManager} from '../../components';
import {StackActions, useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import {firebaseManager} from '../../firebase';
import {selectUser, selectUserLocation, useAppSelector} from '../../states';
import {FBPhoto} from '../../types';
import firestore from '@react-native-firebase/firestore';
import {POINTS_PER_TRANSACTION} from '../../constants';

export const useCameraScreen = () => {
  const navigation = useNavigation<RootStackProps<'Camera'>>();
  const user = useAppSelector(selectUser);
  const userLocation = useAppSelector(selectUserLocation);
  const {requestCameraPermission} = useAppPermission();
  const camera = useRef<Camera>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const takeAPicture = async () => {
    try {
      modalManager.showLoading();
      const photo = await camera.current?.takePhoto();
      if (!photo) {
        modalManager.hideLoading();
        return;
      }
      const photoTitle = `${Date.now()}`;
      const photoName = `${photoTitle}.png`;
      const storageRef = firebaseManager.getStorage(photoName);
      // uploads file
      await storageRef.putFile(photo.path);
      const photoUrl = await storageRef.getDownloadURL();
      const firestoreRef = firebaseManager.getFirestore('gallery');
      const timestamp = firestore.FieldValue.serverTimestamp();
      const points = POINTS_PER_TRANSACTION;
      const data = {
        title: photoTitle,
        photoPath: photoName,
        photoUrl,
        createdAt: timestamp,
        authorID: user.id,
        points,
        ...(userLocation && {
          location: userLocation,
        }),
      };
      await firestoreRef.add(data);
      firebaseManager
        .getFirestore('users')
        .doc(user.id)
        .update({points: (user.points || 0) + points});
      navigation.dispatch(
        StackActions.replace('PointSuccess', {
          data: {
            ...data,
            createdAt: new Date().toISOString(),
          },
        }),
      );
    } catch (error) {
    } finally {
      modalManager.hideLoading();
    }
  };

  return {funcs: {takeAPicture}, refs: {camera}};
};
