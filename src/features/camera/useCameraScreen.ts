import {useEffect, useRef} from 'react';
import {useAppPermission} from '../../hooks';
import {Camera} from 'react-native-vision-camera';
import {modalManager} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import {firebaseManager} from '../../firebase';
import {selectUser, selectUserLocation, useAppSelector} from '../../states';
import {FBPhoto} from '../../types';
import firestore from '@react-native-firebase/firestore';

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
      const data = {
        title: photoTitle,
        photoPath: photoName,
        photoUrl,
        createdAt: timestamp,
        authorID: user.id,
        ...(userLocation && {
          location: userLocation,
        }),
      };
      await firestoreRef.add(data);
      navigation.goBack();
    } catch (error) {
    } finally {
      modalManager.hideLoading();
    }
  };

  return {funcs: {takeAPicture}, refs: {camera}};
};
