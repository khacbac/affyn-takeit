import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton, AppSpacing, AppTextInput, Container} from '../../components';
import {AppImages} from '../../assets';
import {useSignUpScreen} from './useSignUpScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type IProps = {};
export const SignUpScreen: React.FC<IProps> = ({}) => {
  const {funcs, states, isInValid} = useSignUpScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <KeyboardAwareScrollView
        contentContainerStyle={{justifyContent: 'center', flex: 1}}>
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
              <AppTextInput
                placeholder="Confirm Password"
                value={states.confirmPassWord}
                onChangeText={states.setConfirmPassWord}
                secureTextEntry
              />
            </AppSpacing>
          </View>
          <View>
            <AppSpacing spacing={6}>
              <AppButton
                text="Create account"
                onPress={funcs.onCreateAccount}
                disabled={isInValid}
              />
              <Pressable style={styles.createAccount} onPress={funcs.onLogin}>
                <Text>
                  Already got an account?
                  <Text style={{color: '#66b3ff', fontWeight: '500'}}>
                    {' Login'}
                  </Text>
                </Text>
              </Pressable>
            </AppSpacing>
          </View>
        </AppSpacing>
      </KeyboardAwareScrollView>
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
