import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton, AppSpacing, AppTextInput, Container} from '../../components';
import {AppColors, AppImages} from '../../assets';
import {useSignUpScreen} from './useSignUpScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type IProps = {};
export const SignUpScreen: React.FC<IProps> = ({}) => {
  const {funcs, states, isInValid} = useSignUpScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <KeyboardAwareScrollView
        contentContainerStyle={{justifyContent: 'center', flex: 1}}>
        {/* <AppSpacing spacing={24}>
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
        </AppSpacing> */}
        <AppSpacing spacing={120}>
          <Image source={AppImages.logo} style={styles.logo} />
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>User</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.formTitle}>Sign Up</Text>
              <AppSpacing spacing={16}>
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
                <View style={styles.rowBtns}>
                  <AppButton
                    text="SignUp"
                    onPress={funcs.onCreateAccount}
                    disabled={isInValid}
                    style={{flex: 1}}
                  />
                </View>
              </AppSpacing>
              <Text
                style={styles.createAccount}
                onPress={funcs.onCreateAccount}>
                Login
              </Text>
            </View>
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
  createAccount: {
    alignSelf: 'flex-end',
    color: AppColors.primary,
    marginTop: 8,
  },
  form: {
    backgroundColor: AppColors.card,
    paddingHorizontal: 28,
    paddingVertical: 35,
    borderRadius: 48,
  },
  rowBtns: {flexDirection: 'row'},
  google: {
    width: 64,
    height: 64,
    backgroundColor: AppColors.white,
    marginLeft: 16,
  },
  formTitle: {
    color: AppColors.white,
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    marginBottom: 24,
    alignSelf: 'center',
  },
  cardTitle: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 17,
  },
  card: {
    backgroundColor: AppColors.secondary,
    height: 100,
    position: 'absolute',
    left: 12,
    right: 12,
    top: -50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});
