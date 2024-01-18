import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import auth from '@react-native-firebase/auth';

export const useLoginScreen = () => {
  const navigation = useNavigation<RootStackProps<'Login'>>();

  const onLogin = () => {
    // navigation.navigate('Gallery');
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        navigation.navigate('Gallery');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  const onCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  return {funcs: {onLogin, onCreateAccount}};
};
