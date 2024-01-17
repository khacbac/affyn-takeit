import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton, Container} from '../../components';
import {useLoginScreen} from './useLoginScreen';

type IProps = {};
export const LoginScreen: React.FC<IProps> = ({}) => {
  const {funcs} = useLoginScreen();
  return (
    <Container safeArea="all" contentStyle={styles.contentStyle}>
      <AppButton text="Login" onPress={funcs.onLogin} />
    </Container>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
