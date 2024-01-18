import {useEffect, useRef} from 'react';
import {useAppPermission} from '../../hooks';
import {Camera} from 'react-native-vision-camera';

export const useCameraScreen = () => {
  const {requestCameraPermission} = useAppPermission();
  const camera = useRef<Camera>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const takeAPicture = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      console.log('BACHK_____ photo : ', photo);
    } catch (error) {}
  };

  return {funcs: {takeAPicture}, refs: {camera}};
};
