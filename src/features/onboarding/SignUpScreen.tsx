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
import {AppImages} from '../../assets';
import {useSignUpScreen} from './useSignUpScreen';

type IProps = {};
export const SignUpScreen: React.FC<IProps> = ({}) => {
  const {funcs} = useSignUpScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <AppSpacing spacing={24}>
        <Image source={AppImages.logo} style={styles.logo} />
        <View>
          <AppSpacing spacing={12}>
            <AppTextInput placeholder="Email" />
            <AppTextInput placeholder="Password" />
            <AppTextInput placeholder="Confirm Password" />
          </AppSpacing>
        </View>
        <View>
          <AppSpacing spacing={6}>
            <AppButton text="Create account" onPress={funcs.onCreateAccount} />
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
