import {useNavigation} from '@react-navigation/native';
import {RootStackProps} from '../../navigations';

export const useLoginScreen = () => {
  const navigation = useNavigation<RootStackProps<'Login'>>();

  const onLogin = () => {
    navigation.navigate('Gallery');
  };

  return {funcs: {onLogin}};
};
