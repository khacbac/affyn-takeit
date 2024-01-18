import {useEffect, useRef} from 'react';
import {useAppPermission} from '../../hooks';
import {Camera} from 'react-native-vision-camera';
import {modalManager} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import {firebaseManager} from '../../firebase';

export const useCameraScreen = () => {
  const navigation = useNavigation<RootStackProps<'Camera'>>();
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
      const firestoreRef = firebaseManager.getFirestore('gallery');
      firestoreRef.add({title: photoTitle, photoName});
      navigation.goBack();
    } catch (error) {
    } finally {
      modalManager.hideLoading();
    }
  };

  return {funcs: {takeAPicture}, refs: {camera}};
};
