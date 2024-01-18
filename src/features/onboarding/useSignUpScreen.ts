import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';
import auth from '@react-native-firebase/auth';

export const useSignUpScreen = () => {
  const navigation = useNavigation<RootStackProps<'Login'>>();

  const onLogin = () => {
    navigation.goBack();
  };

  const onCreateAccount = () => {};

  return {funcs: {onLogin, onCreateAccount}};
};
