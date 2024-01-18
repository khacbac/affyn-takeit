import {useEffect, useRef} from 'react';
import {useAppPermission} from '../../hooks';
import {Camera} from 'react-native-vision-camera';
import {modalManager} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';

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
      console.log('BACHK_____ photo : ', photo);
      navigation.goBack();
    } catch (error) {
    } finally {
      modalManager.hideLoading();
    }
  };

  return {funcs: {takeAPicture}, refs: {camera}};
};
