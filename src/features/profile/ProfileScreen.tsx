import React from 'react';
import {Container} from '../../components';
import {Text} from 'react-native';

type IProps = {};
export const ProfileScreen: React.FC<IProps> = ({}) => {
  return (
    <Container safeArea="all">
      <Text>ProfileScreen</Text>
    </Container>
  );
};
