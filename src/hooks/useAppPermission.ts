import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const useAppPermission = () => {
  const requestCameraPermission = () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;
    check(permission)
      .then(res => {
        if (res === 'granted') {
          return;
        }
        request(permission).catch(() => {});
      })
      .catch(() => {});
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.LOCATION_ALWAYS;
      const res = await check(permission);
      if (res === 'granted') {
        return true;
      }
      const requestRes = await request(permission);
      return requestRes === 'granted';
    } catch (error) {
      throw error;
    }
  };

  return {requestCameraPermission, requestLocationPermission};
};
