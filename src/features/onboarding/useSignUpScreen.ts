import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import auth from '@react-native-firebase/auth';
import {useMemo, useState} from 'react';
import {validateEmail} from '../../utils';
import {modalManager} from '../../components';
import {Keyboard} from 'react-native';
import {firebaseManager} from '../../firebase';

export const useSignUpScreen = () => {
  const navigation = useNavigation<RootStackProps<'Login'>>();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [confirmPassWord, setConfirmPassWord] = useState('');

  const isInValid = useMemo(() => {
    return (
      !email ||
      !validateEmail(email) ||
      !password ||
      !confirmPassWord ||
      password !== confirmPassWord
    );
  }, [email, password, confirmPassWord]);

  const onLogin = () => {
    navigation.goBack();
  };

  const onCreateAccount = async () => {
    if (isInValid) {
      return;
    }
    Keyboard.dismiss();
    try {
      modalManager.showLoading();
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = response.user.uid;
      const data = {id: uid, email};
      await firebaseManager.getFirestore('users').doc(uid).set(data);
      navigation.goBack();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
    } finally {
      modalManager.hideLoading();
    }
  };

  return {
    isInValid,
    funcs: {onLogin, onCreateAccount},
    states: {
      email,
      setEmail,
      password,
      setPassWord,
      confirmPassWord,
      setConfirmPassWord,
    },
  };
};
