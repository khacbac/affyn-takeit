import {useNavigation} from '@react-navigation/native';

export const useLoginScreen = () => {
  const navigation = useNavigation();

  const onLogin = () => {
    navigation.navigate('Gallery');
  };

  return {funcs: {onLogin}};
};
