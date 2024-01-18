import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import auth from '@react-native-firebase/auth';
import {useMemo, useState} from 'react';
import {validateEmail} from '../../utils';
import {modalManager} from '../../components';
import {Alert, Keyboard, Platform} from 'react-native';
import {firebaseManager} from '../../firebase';
import {setIsLoggedIn, setUser, useAppDispatch} from '../../states';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'android'
      ? '452543649123-e2uv5pgh2aruqo47ksti1pgpdfl2cl72.apps.googleusercontent.com'
      : '452543649123-nhncsjhmg5dubukhsam42hkgjvkvr42m.apps.googleusercontent.com',
});

export const useLoginScreen = () => {
  const navigation = useNavigation<RootStackProps<'Login'>>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const isInValid = useMemo(() => {
    return !email || !validateEmail(email) || !password;
  }, [email, password]);

  const onLogin = async () => {
    if (isInValid) {
      return;
    }
    try {
      Keyboard.dismiss();
      modalManager.showLoading();
      const response = await auth().signInWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const usersRef = firebaseManager.getFirestore('users');
      const userDoc = await usersRef.doc(uid).get();
      if (!userDoc.exists) {
        return;
      }
      const user: any = userDoc.data();
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
    } catch (error) {
      Alert.alert('Something went wrong.\nPlease try again');
    } finally {
      modalManager.hideLoading();
    }
  };

  const onCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  const onGoolgeLogin = async () => {
    try {
      modalManager.showLoading();
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      const response = await auth().signInWithCredential(googleCredential);
      if (response.user.email) {
        dispatch(setUser({email: response.user.email, id: response.user.uid}));
        dispatch(setIsLoggedIn(true));
      } else {
        Alert.alert('Something went wrong.\nPlease try again');
      }
    } catch (error) {
      Alert.alert('Something went wrong.\nPlease try again');
    } finally {
      modalManager.hideLoading();
    }
  };

  return {
    isInValid,
    states: {
      email,
      setEmail,
      password,
      setPassWord,
    },
    funcs: {onLogin, onCreateAccount, onGoolgeLogin},
  };
};
