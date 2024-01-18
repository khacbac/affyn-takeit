import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const useAppPermission = () => {
  const requestCameraPermission = () => {
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(res => {
        if (res === 'granted') {
          return;
        }
        request(PERMISSIONS.ANDROID.CAMERA).catch(() => {});
      })
      .catch(() => {});
  };

  return {requestCameraPermission};
};
