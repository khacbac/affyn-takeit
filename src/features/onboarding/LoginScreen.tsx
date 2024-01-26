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
import {AppColors, AppImages} from '../../assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type IProps = {};
export const LoginScreen: React.FC<IProps> = ({}) => {
  const {funcs, isInValid, states} = useLoginScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <KeyboardAwareScrollView
        contentContainerStyle={{justifyContent: 'center', flex: 1}}>
        <AppSpacing spacing={120}>
          <Image source={AppImages.logo} style={styles.logo} />
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>User</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.formTitle}>Sign In</Text>
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
                <View style={styles.rowBtns}>
                  <AppButton
                    text="Login"
                    onPress={funcs.onLogin}
                    disabled={isInValid}
                    style={{flex: 1}}
                  />
                  <AppButton
                    style={styles.google}
                    onPress={funcs.onGoolgeLogin}>
                    <Image source={AppImages['google-logo']} />
                  </AppButton>
                </View>
                <Text
                  style={styles.createAccount}
                  onPress={funcs.onCreateAccount}>
                  Create account
                </Text>
              </AppSpacing>
            </View>
          </View>
        </AppSpacing>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {width: 85, height: 85, resizeMode: 'cover', alignSelf: 'center'},
  password: {marginTop: 10},
  createAccount: {color: AppColors.primary},
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
