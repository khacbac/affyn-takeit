import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import auth from '@react-native-firebase/auth';
import {useMemo, useState} from 'react';
import {validateEmail} from '../../utils';
import {modalManager} from '../../components';
import {Keyboard} from 'react-native';
import {firebaseManager} from '../../firebase';
import {setIsLoggedIn, setUser, useAppDispatch} from '../../states';

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
    } finally {
      modalManager.hideLoading();
    }
  };

  const onCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  return {
    isInValid,
    states: {
      email,
      setEmail,
      password,
      setPassWord,
    },
    funcs: {onLogin, onCreateAccount},
  };
};
