import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AppButton, AppSpacing, AppTextInput, Container} from '../../components';
import {useLoginScreen} from './useLoginScreen';
import {AppImages} from '../../assets';

type IProps = {};
export const LoginScreen: React.FC<IProps> = ({}) => {
  const {funcs, isInValid, states} = useLoginScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <AppSpacing spacing={24}>
        <Image source={AppImages.logo} style={styles.logo} />
        <View>
          <AppSpacing spacing={12}>
            <AppTextInput
              placeholder="Email"
              value={states.email}
              onChangeText={states.setEmail}
            />
            <AppTextInput
              placeholder="Password"
              value={states.password}
              onChangeText={states.setPassWord}
              secureTextEntry
            />
          </AppSpacing>
        </View>
        <View>
          <AppSpacing spacing={6}>
            <AppButton
              text="Login"
              onPress={funcs.onLogin}
              disabled={isInValid}
            />
            <Pressable
              style={styles.createAccount}
              onPress={funcs.onCreateAccount}>
              <Text style={{color: '#66b3ff', fontWeight: '500'}}>
                Create account
              </Text>
            </Pressable>
          </AppSpacing>
        </View>
      </AppSpacing>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  logo: {width: 100, height: 100, resizeMode: 'cover', alignSelf: 'center'},
  password: {marginTop: 10},
  createAccount: {alignSelf: 'flex-end'},
});
