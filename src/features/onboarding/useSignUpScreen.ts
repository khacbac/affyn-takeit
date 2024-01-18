import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import auth from '@react-native-firebase/auth';
import {useMemo, useState} from 'react';
import {validateEmail} from '../../utils';
import {modalManager} from '../../components';
import {Keyboard} from 'react-native';

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

  const onCreateAccount = () => {
    if (isInValid) {
      return;
    }
    Keyboard.dismiss();
    modalManager.showLoading();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.goBack();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        modalManager.hideLoading();
      });
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
