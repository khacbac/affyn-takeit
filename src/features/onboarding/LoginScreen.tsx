import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {AppButton, AppSpacing, AppTextInput, Container} from '../../components';
import {useLoginScreen} from './useLoginScreen';
import {AppImages} from '../../assets';

type IProps = {};
export const LoginScreen: React.FC<IProps> = ({}) => {
  const {funcs} = useLoginScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <AppSpacing spacing={24}>
        <Image source={AppImages.logo} style={styles.logo} />
        <View>
          <AppSpacing spacing={12}>
            <AppTextInput placeholder="username" />
            <AppTextInput placeholder="password" />
          </AppSpacing>
        </View>
        <AppButton text="Login" onPress={funcs.onLogin} />
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
});
