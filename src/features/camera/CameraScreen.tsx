import React from 'react';
import {Text, View} from 'react-native';
import {Container} from '../../components';
import {useCameraScreen} from './useCameraScreen';

type IProps = {};
export const CameraScreen: React.FC<IProps> = ({}) => {
  const {} = useCameraScreen();
  return (
    <Container>
      <Text>CameraScreen</Text>
    </Container>
  );
};
